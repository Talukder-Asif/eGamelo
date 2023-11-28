/* eslint-disable no-unused-vars */
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authantication/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googleIcon from '/src/assets/google 1.svg'
import PageName from "../../Components/PageName";
import FormBTN from "../../Components/FormBTN";

const CreateAccount = () => {
    const navigate = useNavigate();
    const [error, seterror] = useState(null);
    const { createUser, googleSignup, update } = useContext(AuthContext);
    const handelCreate = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const photo = form.photo.value;
      const password = form.password.value;
      seterror(null);
      // Check if the password is at least 6 characters long
      if (password.length < 6) {
        seterror(null);
        return seterror("Password must be at least 6 characters long.");
      }
  
      // Check if the password contains at least one capital letter
      if (!/[A-Z]/.test(password)) {
        return seterror("Password must contain at least one capital letter.");
      }
  
      // Check if the password contains at least one special character
      if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(password)) {
        return seterror("Password must contain at least one special character.");
      }
      return createUser(email, password)
        .then((result) => {
          const user = result.user;
        axios.post('https://testhalal-server.vercel.app/jwt', user, {withCredentials:true})
        .then(res=> console.log(res.data))
          update(name, photo);


          const userData = {
            name: name,
            email: email,
            role: "User",
            photo: photo,
            Contest:[]
          }
          axios.post('http://localhost:5000/user', userData)
          .then(res=> console.log(res.data));



          Swal.fire({
            icon: "success",
            title: "Sign up successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonColor: "#f72c00",
          });
        });
    };
    const handelGoogle = () => {
      googleSignup()
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
  
          const user = result.user;
        axios.post('https://testhalal-server.vercel.app/jwt', user, {withCredentials:true})
        .then(res=> console.log(res.data))
        const userData = {
          name: user.displayName,
          email: user.email,
          role: "User",
          photo: user.photoURL,
          Contest:[]
        }
        axios.post('http://localhost:5000/user', userData)
        .then(res=> console.log(res.data));
          Swal.fire({
            icon: "success",
            title: "Sign up successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          // navigate("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          Swal.fire({
            icon: "error",
            title: errorMessage,
            showConfirmButton: false,
            timer: 3000,
          });
        });
    };
    return (
      <div>
        <PageName pageName={'Sign Up'}></PageName>
        <div className=" max-w-2xl m-auto my-5 p-5">
          <h3 className="text-2xl md:text-3xl text-gray-900 mb-5 lg:text-4xl font-bold">
            Create a account
          </h3>
          <div>
            <form onSubmit={handelCreate}>
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Email Address"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="photo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your photo URL"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              {
                  error? <p className="text-red-600 py-2">{error}</p>:""
                }
              
                <FormBTN btnTitle={"Sign Up"}></FormBTN>


            </form>
          </div>
          <div className="mt-5 flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex gap-2 justify-end">
              <p className="text-lg font-semibold" href="#">
                Sign up with -{" "}
              </p>

              <img onClick={handelGoogle} className='w-6' src={googleIcon} alt="" />

            </div>
            <div className="">
              <a
                className="border-b-2 text-lg font-semibold border-transparent hover:border-[#eb0029]"
                href="/signin"
              >
                Have any account ?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CreateAccount;