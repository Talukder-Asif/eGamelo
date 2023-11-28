import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import CreateAccount from "../Pages/Registration/CreateAccount";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import DashboardLayout from "../Pages/RoleManagment/DashboardLayout";
import Profile from "../Pages/RoleManagment/User/Profile/Profile";
import ManageUser from "../Pages/RoleManagment/Admin/ManageUser/ManageUser";
import AdminRoute from "./AdminRoute";
import ContestCreatorRoute from "./ContestCreatorRoute";
import AddContest from "../Pages/RoleManagment/ContentCreator/AddContest/AddContest";
import MyContest from "../Pages/RoleManagment/ContentCreator/MyContest/MyContest";
import UpdateContest from "../Pages/RoleManagment/ContentCreator/UpdateContest/UpdateContest";
import ManageContest from "../Pages/RoleManagment/Admin/ManageContest/ManageContest";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import Payment from "../Pages/Payment/Payment";
import ParticipentContest from "../Pages/RoleManagment/User/ParticipantContest/ParticipentContest";
import WinningContest from "../Pages/RoleManagment/User/WinningContest/WinningContest";
import Submission from "../Pages/RoleManagment/ContentCreator/Submission/Submission";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <CreateAccount></CreateAccount>,
      },
      {
        path:"/allContests",
        element:<AllContest></AllContest>,
      },
      {
        path:"/details/:id",
        element:<PrivateRoute>
          <ContestDetails></ContestDetails>
        </PrivateRoute>
      },
      {
        path:"/payment/:id",
        element:<PrivateRoute>
          <Payment></Payment>
        </PrivateRoute>
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <UserRoute>
              <DashboardLayout></DashboardLayout>
            </UserRoute>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/participent",
            element:<ParticipentContest></ParticipentContest>
          },
          {
            path: "/dashboard/win",
            element:<WinningContest></WinningContest>
          },
          {
            path: "/dashboard/users",
            element: (
              <AdminRoute>
                <ManageUser></ManageUser>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/addContest",
            element: (
              <ContestCreatorRoute>
                <AddContest></AddContest>
              </ContestCreatorRoute>
            ),
          },
          {
            path: "/dashboard/submission/:id",
            element: (
              <ContestCreatorRoute>
                <Submission></Submission>
              </ContestCreatorRoute>
            ),
          },
          {
            path: "/dashboard/myContest",
            element: (
              <ContestCreatorRoute>
                <MyContest></MyContest>
              </ContestCreatorRoute>
            ),
          },
          {
            path:'/dashboard/updateContest/:id',
            element:<ContestCreatorRoute>
              <UpdateContest></UpdateContest>
            </ContestCreatorRoute>
          },
          {
            path:'/dashboard/manageContest',
            element:<AdminRoute>
              <ManageContest></ManageContest>
            </AdminRoute>
          }
        ],
      },
    ],
  },
]);
