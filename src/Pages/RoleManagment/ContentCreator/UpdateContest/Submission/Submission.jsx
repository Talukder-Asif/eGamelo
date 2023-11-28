import { useParams } from "react-router-dom";
import useSubmit from "../../../../../Hooks/useSubmit";
import useAxios from "../../../../../Hooks/useAxios";


const Submission = () => {
    const Id = useParams().id;
    const [submit, issubmitLoading, refetch] = useSubmit(Id);
    const axiosPublic = useAxios();
    const handelMakeWin = (winner) => {
        console.log(winner)


        // Update the user Data
        axiosPublic.put(`/winner/user?email=${winner?.userEmail}&contestID=${winner?.contestID}`)
        .then(res=> console.log(res.data))

        // Update the order Data
        axiosPublic.put(`/winner/order?email=${winner?.userEmail}&contestID=${winner?.contestID}`)
        .then(res=> console.log(res.data))









        
    }





    if (issubmitLoading) {
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
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  #
                </label>
              </th>
              <th>Participent Name</th>
              <th>Email</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                submit?.map((data, i) =>
                  <tr key={i}>
              <th>
                <label>
                  {i+1}
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={data?.userImg}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data?.userName}</div>
                  </div>
                </div>
              </td>
              <td>
                {data?.userEmail}
              </td>
              <td>
                {data?.userResult}
              </td>
              <th className="text-right">
              <div className=" grid md:inline">
                <button onClick={() => handelMakeWin(data)}  className="btn border-2px border-[#1b1d4d] my-1 md:mx-3 px-3 py-1 bg-[#1b1d4d] text-white btn-xs hover:text-[#1b1d4d] hover:border-[#1b1d4d] hover:bg-white">Make Win</button>
                
                {/* <button onClick={() => handelMakeWin(contest)} className={contest.status === 'Approved'? "hidden" :"btn border-2px border-[#1b1d4d] my-1 md:mx-3 px-3 py-1 bg-[#1b1d4d] text-white btn-xs hover:text-[#1b1d4d] hover:border-[#1b1d4d] hover:bg-white"}>Make Win</button>
                 */}
              </div>
              </th>
            </tr>
              )
            }
          
          </tbody>
        </table>
      </div>
      );
};

export default Submission;