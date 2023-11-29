import { useParams } from "react-router-dom";
import PageName from "../../Components/PageName";
import useContestById from "../../Hooks/useContestById";
import useUserDetails from "../../Hooks/useUserDetails";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const Payment = () => {
  const Id = useParams().id;
  const [contest, isContestLoading] = useContestById(Id);
  const [User, isUserLoading, refetch] = useUserDetails();
  const axiosPublic = useAxios();

  const submited = User?.Contest?.find((ab) => ab?.contestID === contest?._id);
  // submited? console.log("Found") : console.log("Not");
  const handelSubmit = (e) => {
    e.preventDefault();
    const TrxID = e.target.TrxID.value;
    if (TrxID.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid TrxID",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const ContestPert = {
      name: contest.name,
      image: contest.image,
      TrxID,
      result: "No Result",
      contestDeadline: contest.contestDeadline,
      contestID: contest._id,
      instruction: contest.instruction,
      participation: parseInt(contest.participation) + 1,
      prizeMoney: contest.prizeMoney,
    };
    // Updating UserAPI
    const updateUser = {
      name: User?.name,
      email: User?.email,
      role: User?.role,
      photo: User?.photo,
      contestAdded: User?.contestAdded,
      win:User?.win,
      Contest: [...User.Contest, ContestPert],
    };
    axios
      .put(`https://end-game-server-delta.vercel.app/user/${User?.email}`, updateUser)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // refetch();
          // Swal.fire({
          //     icon: "success",
          //     title: `${User.name} is an contestCreator Now!`,
          //     showConfirmButton: false,
          //     timer: 1500
          //   });
        }
      });

    // Update Contest API
    const updateContest = {
      name: contest.name,
      image: contest.image,
      contestPrice: contest.contestPrice,
      prizeMoney: contest.prizeMoney,
      details: contest.details,
      instruction: contest.instruction,
      contestCreator: contest.contestCreator,
      createdBy: contest.createdBy,
      tag: contest.tag,
      status: contest.status,
      participation: parseInt(contest.participation) + 1,
      contestDeadline: contest.contestDeadline,
    };

    axiosPublic.put(`/contest/${contest?._id}`, updateContest).then((res) => {
      if (res.data.modifiedCount > 0) {
        //   refetch();
        //   Swal.fire({
        //         icon: "success",
        //         title: `${contest.name} is Approve Now!`,
        //         showConfirmButton: false,
        //         timer: 1500,
        //       });
      }
    });

    // Add Submit data to the Server
    const submitData = {
      userName: User.name,
      userImg: User.photo,
      userEmail: User.email,
      userResult: "Not Win",
      contestName: contest.name,
      contestImg: contest.image,
      contestID: contest._id,
      TrxID,
    };
    axiosPublic.post(`/submit`, submitData).then((res) => {
      if (res.data.acknowledged === true) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Submit Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  if (isContestLoading || isUserLoading) {
    return (
      <div className="h-screen w-screen grid content-center justify-center">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#eb0029]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold">Loading....</h1>
      </div>
    );
  }
  return (
    <div>
      <PageName pageName={"bKash Payment"}></PageName>
      <div className="my-5  px-3">
        <h3 className="text-3xl md:text-4xl font-bold text-[#111827]"></h3>

        <div className="my-5 md:grid grid-cols-2 gap-3">
          <div className="p-3 border-2 border-black">
            <h3 className="text-3xl md:text-4xl font-bold text-[#111827]">
              Contest Details
            </h3>
            <div className="card md:card-side bg-base-100 mt-3 shadow-xl ">
              <figure className="md:max-w-[40%]">
                <img src={contest?.image} alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{contest?.name}</h2>
                <p>Price : {contest?.contestPrice}</p>
                <p>Contest Deadline : {contest?.contestDeadline}</p>
              </div>
            </div>
          </div>
          <div className="p-3 border-2 border-black">
            <h3 className="text-3xl md:text-4xl font-bold text-[#111827]">
              Your Information
            </h3>
            <div className="card md:card-side bg-base-100 mt-3 shadow-xl ">
              <figure className="md:max-w-[40%]">
                <img src={User?.photo} alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{User?.name}</h2>
                <p>Role : {User?.role}</p>
                <p>Email : {User?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {submited ? (
        <h1 className="text-5xl text-center mb-4 font-extrabold dark:text-white">
          You Are Already Registered
        </h1>
      ) : (
        <div className="my-5 px-3">
          <h3 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Confirm Payment
          </h3>
          <div className="md:grid grid-cols-2 gap-5">
            <p className="text-lg font-semibold">
              Send Money on 01885049289 Personal Bkash account and to confirm
              your Payment, Give your 10 digit TrxID and Click submit, Admin
              will check your information as soon as possible.
            </p>

            <form
              onSubmit={handelSubmit}
              className="flex border-2 border-black p-2 justify-evenly items-end flex-wrap space-y-2"
            >
              <div>
                <label>Your TrxID</label>
                <input
                  type="text"
                  name="TrxID"
                  placeholder="TrxID EX: AKO2SG9PJO"
                  className="input input-bordered input-error w-full max-w-xs"
                />
              </div>
              <button
                type="submit"
                className="btn border-2 border-[#eb0029] text-white bg-[#eb0029] hover:bg-white hover:text-[#eb0029] font-medium rounded-lg text-base dark:bg-red-600 dark:hover:bg-red-700  dark:focus:ring-red-900"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
