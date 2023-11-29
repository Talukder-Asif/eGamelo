import Swal from "sweetalert2";
import FormBTN from "../../../../Components/FormBTN";
import useUserDetails from "../../../../Hooks/useUserDetails";
import { PieChart, Pie, Cell } from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../../../Authantication/AuthProvider/AuthProvider";
import axios from "axios";

const Profile = () => {
  const [User, isUserLoading] = useUserDetails();
  const { update } = useContext(AuthContext);
  const totalContest = User?.Contest?.length;
  const notWin = User?.Contest?.filter((ab) => ab?.result !== "Win").length;
  const win = User?.Contest?.filter((ab) => ab?.result === "Win").length;

  const handelUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb0029",
      cancelButtonColor: "#1b1d4d",
      confirmButtonText: "Yes, Update Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        update(name, photo);
        const updateData = {
          name: name,
          email: User?.email,
          role: User?.role,
          contestAdded: User?.contestAdded,
          win: User?.win,
          photo: photo,
          Contest: User.Contest,
        };
        axios
          .put(
            `https://end-game-server-delta.vercel.app/user/${User?.email}`,
            updateData
          )
          .then((res) => console.log(res.data));
        Swal.fire({
          icon: "success",
          title: "Update successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // Pie charts
  const data = [
    { name: "Win", value: win },
    { name: "Not Win", value: notWin },
  ];
  const COLORS = ["#1b1d4d", "#eb0029", "#FF8042", "#FFBB28"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isUserLoading) {
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
        <h1 className="text-4xl md:text-7xl font-bold">Loading....</h1>
      </div>
    );
  }
  return (
    <div>
      <h3 className=" mb-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
        My Profile
      </h3>
      <div className="flex gap-10 flex-wrap">
        <img className="w-40 h-40 rounded-full" src={User?.photo} alt="" />
        <div>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-2xl font-bold">
            ID : {User?._id}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-2xl font-bold">
            Full Name : {User?.name}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-2xl font-bold">
            Email : {User?.email}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 lg:text-2xl font-bold">
            Role :{" "}
            <span className="border-b-4 border-b-[#eb0029]">{User?.role}</span>
          </h3>
        </div>
      </div>
      <h3 className=" my-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
        Wining percentage
      </h3>
      <div className="">
        <PieChart
          className="m-auto mt-16 mb-5 scale-150"
          width={190}
          height={190}
        >
          <Pie
            data={data}
            cx={80}
            cy={80}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="flex justify-evenly">
          <p className="font-semibold">
            Total Contest :{" "}
            <span className="border-b-4 border-white">{totalContest}</span>
          </p>
          <p className="font-semibold border-b-4 border-[#1b1d4d]">
            Win : <span className="">{win}</span>
          </p>
          <p className="font-semibold border-b-4 border-[#eb0029]">
            Not Win : <span className="">{notWin}</span>
          </p>
        </div>
      </div>

      <h3 className=" my-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
        Update Profile
      </h3>
      <form onSubmit={handelUpdate}>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <label> New Name</label>
            <input
              type="text"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={User.name}
              required
            />
          </div>
          <div className="">
            <label> New Photo URL</label>
            <input
              type="text"
              name="photo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={User.photo}
              required
            />
          </div>
        </div>

        <FormBTN btnTitle={"Update now"}></FormBTN>
      </form>
    </div>
  );
};

export default Profile;
