import { useContext } from "react";
import { AuthContext } from "../../../../Authantication/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../../../Hooks/useAxios";
import FormBTN from "../../../../Components/FormBTN";

const AddContest = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const handelAdd = (e) => {
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
      status: "Pending",
      participation: 0,
      contestDeadline:form.deadline.value
    };
    // console.log(data)
    axiosPublic.post("/addcontest", data).then((res) =>
      res?.data?.acknowledged
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Your contest successfully send to the Admins",
            showConfirmButton: false,
            timer: 1500,
          })
        : Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          })
    );
  };
  return (
    <div>
      <h3 className=" mb-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
        Add Contest
      </h3>

      <div>
        <form onSubmit={handelAdd}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contest Name
              </label>
              <input
                type="text"
                name="contestName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Give a meaningful name"
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
                placeholder="$"
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
                placeholder="$"
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
                placeholder="Write contest details here..."
              ></textarea>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Submission text instruction
              </label>
              <textarea
                name="instruction"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="How student's can submit there answer..."
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Created By
              </label>
              <input
                type="text"
                name="contestCreator"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user?.displayName}
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
                defaultValue={user?.email}
                disabled
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contest Type/Tags
              </label>
              <select name="tag" defaultValue className="select select-error w-full">
                <option disabled value>
                  What tag is the best for your contest?
                </option>
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
                required
              />
            </div>
          </div>

          <FormBTN btnTitle={'Add this Contest'}></FormBTN>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
