import { useParams } from "react-router-dom";
import useContestById from "../../Hooks/useContestById";
import FormBTN from "../../Components/FormBTN";
import App from "../../Components/Coundown/App";
import useSubmit from "../../Hooks/useSubmit";

const ContestDetails = () => {
  const Id = useParams().id;
  const [contest, isContestLoading] = useContestById(Id);
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const remainingTime = Date.parse(contest?.contestDeadline) / 1000 - stratTime;
console.log(contest)
const [submit] = useSubmit(Id)
const winnerDetails = submit?.find(data => data?.userResult === "Win")



  if (isContestLoading) {
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
    <div className="md:flex gap-5 py-10 px-5">
      <div className="md:w-[65%]">
        <h3 className="text-3xl md:text-4xl font-bold text-[#111827]">
          {contest.name}
        </h3>
        <div className="border border-black p-2 m-2 md:p-5 md:m-5 space-y-3">
          <h2 className="underline text-xl font-semibold">Instructor</h2>
          <p className="text-base md:text-lg font-medium">
            Name : {contest.contestCreator}
          </p>
          <p className="text-base md:text-lg font-medium">
            Email : {contest.createdBy}
          </p>
        </div>
        <p className="text-base md:text-lg font-medium">
          Total participation : {contest.participation}
        </p>
        <p className="text-lg border-b-2 py-5 border-black text-center font-semibold">
          Prize Money{" "}
          <span className="text-[#eb0029] font-bold text-2xl md:text-3xl lg:text-6xl">
            {contest.prizeMoney}{" "}
          </span>
          BDT
        </p>

        <p className="text-base md:text-lg font-medium">
          Contest Details : {contest.details}
        </p>

        {remainingTime >= 0 ? (
          <App EndDate={contest.contestDeadline}></App>
        ) : null}
      </div>

      <div className="md:w-[34%] ">
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img src={contest.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Price : {contest.contestPrice} Taka</h2>
            <div className="card-actions justify-start">
              {remainingTime >= 0 ? (
                <a className="w-full" href={"/payment/"+contest._id}><FormBTN btnTitle={"Registration"}></FormBTN></a>
              ) : (
                <button disabled className="btn w-full">
                  Registration
                </button>
              )}
            </div>
          </div>
        </div>

        {remainingTime >= 0 ? null : (
          <div className="overflow-x-auto border-2 px-4 border-black mt-5">
          <h2 className="my-5 text-xl font-semibold">This Contest Winners</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={winnerDetails.userImg}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{winnerDetails.userName}</div>
                        <div className="text-sm opacity-50">{winnerDetails.userEmail}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetails;
