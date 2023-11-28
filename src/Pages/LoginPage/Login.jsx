/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { AuthContext } from '../../Authantication/AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import PageName from '../../Components/PageName';
import google from '/src/assets/google 1.svg'
import FormBTN from '../../Components/FormBTN';
const Login = () => {
    const {login, googleSignup} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const HandelLogin = (e) =>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      login(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
  
        axios.post('http://localhost:5000/jwt', user, {withCredentials:true})
        .then(res=> console.log(res.data))
  
  
        Swal.fire({
          icon: 'success',
          title: 'Log in successfully',
          showConfirmButton: false,
          timer: 1500
        })
  
        navigate(location?.state ? location.state : '/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 3000
        })
      });
    }
  
  
    const handelGoogle = () =>{
      googleSignup()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        axios.post('http://localhost:5000/jwt', user, {withCredentials:true})
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
          icon: 'success',
          title: 'Log in successfully',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(location?.state ? location.state : '/')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    return (
      <div>

      <PageName pageName={"Sign in"}></PageName>




        <div className=" max-w-2xl m-auto my-5 p-5">
        <h3 className="text-2xl md:text-3xl text-gray-900 mb-5 lg:text-4xl font-bold">
                Log in
              </h3>
          <div>
          <form onSubmit={HandelLogin}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your Email Address"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <FormBTN btnTitle={"Sign In"}></FormBTN>
          </form>
          </div>
          <div className="mt-5 flex flex-wrap md:flex-nowrap justify-between">
          <div className='flex gap-2 justify-end'>
              <p className="text-lg font-semibold" href="#">Sign in with - </p>

              <img onClick={handelGoogle} className='w-6' src={google} alt="" />

              </div>
              <div className=''>
                  <a className="border-b-2 text-lg font-semibold border-transparent hover:border-[#eb0029]" href="/signup">Or create a account ?</a>
              </div>
              
          </div>
        </div>
      </div>
    );
  };
  

export default Login;