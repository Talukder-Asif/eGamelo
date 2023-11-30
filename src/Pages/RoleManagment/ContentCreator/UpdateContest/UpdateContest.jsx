import { useParams } from "react-router-dom";
import useContestById from "../../../../Hooks/useContestById";
import Swal from "sweetalert2";
import useAxios from "../../../../Hooks/useAxios";
import FormBTN from "../../../../Components/FormBTN";

const UpdateContest = () => {
    const Id = useParams().id;
    const [contest, isContestLoading, refetch] = useContestById(Id)
    const axiosPublic = useAxios();
    const handelUpdate = (e) => {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.contestName.value,
        image: form.photoURL.value,
        contestPrice: form.contestPrice.value,
        prizeMoney: form.prizeMoney.value,
        details: form.details.value,
        instruction: form.instruction.value,
        contestCreator: form.contestCreator.value,
        createdBy: form.email.value,
        tag: form.tag.value,
        status: contest.status,
        participation: contest.participation,
        contestDeadline:form.deadline.value
      };
      // console.log(data)
      axiosPublic.put(`/contest/${contest?._id}`, data)
      .then((res) =>{
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                icon: "success",
                title: "Updated Successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
      }
      );
    };
    if (isContestLoading) {
        return (
          <div className="grid min-h-[400px] content-center justify-center">
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
            <h1 className="text-4xl md:text-7xl font-bold">Please Wait....</h1>
          </div>
        );
      }
    return (
        <div>
        <h3 className=" mb-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
          Update Contest
        </h3>
  
        <div>
          <form onSubmit={handelUpdate}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contest Name
                </label>
                <input
                  type="text"
                  name="contestName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.name}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  defaultValue={contest.image}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contest Price
                </label>
                <input
                  type="text"
                  name="contestPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.contestPrice}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Prize money
                </label>
                <input
                  type="text"
                  name="prizeMoney"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.prizeMoney}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Created By
                </label>
                <input
                  type="text"
                  name="contestCreator"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.contestCreator}
                  disabled
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.createdBy}
                  disabled
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contest Type/Tags
                </label>
                <select name="tag" defaultValue={contest.tag} className="select select-error w-full">
                  <option>Business Contest</option>
                  <option>Medical Contest</option>
                  <option>Article Writing</option>
                  <option>Gaming</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contest Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.contestDeadline}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contest Description
                </label>
                <textarea
                  name="details"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.details}
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Task Submission text instruction
                </label>
                <input type="url"
                  name="instruction"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={contest.instruction}
                ></input>
              </div>
  
            </div>
  
            <FormBTN btnTitle={'Update this Contest'}></FormBTN>
          </form>
        </div>
      </div>
    );
};

export default UpdateContest;