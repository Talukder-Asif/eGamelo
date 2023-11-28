import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../Authantication/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const navStyle =
  "block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

let dropdownClick = false;
const navs = (
  <>
    <li>
      <NavLink to="/" className={navStyle} aria-current="page">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/allContests" className={navStyle}>
        All Contests
      </NavLink>
    </li>
    <li>
      <NavLink to="/blog" className={navStyle}>
        Blog
      </NavLink>
    </li>
  </>
);
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handelDropdown = () => {
    dropdownClick = !dropdownClick;
    const elememts = document.getElementById("mobileManu");
    if (dropdownClick) {
      elememts.classList.remove("hidden");
      elememts.classList.add("absolute");
      elememts.classList.add("top-12");
      elememts.classList.add("right-10");
      elememts.classList.add("z-50");
    } else {
      elememts.classList.add("hidden");
      elememts.classList.remove("absolute");
      elememts.classList.remove("top-12");
      elememts.classList.remove("right-10");
      elememts.classList.remove("z-50");
    }
  };
  const navigate = useNavigate();
  const handelLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb0029",
      cancelButtonColor: "#1b1d4d",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
        .then(() => {
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // An error happened.
        });
        navigate("/signin");
        // window.location.reload();
      }
    });
      
  };

  return (
    <div>
      <nav className="bg-[#1b1d4d] border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-2 md:px-4 py-2">
          <Link to="/" className="flex items-center">
            <img src={'https://egamlio.vercel.app/images/logo.png'} className="h-8 md:h-10 md:mr-3" alt="" />
          </Link>

          <div className="flex items-center md:order-2">
            {/* Dashboard Button */}
            {user?.email ? (
              <div className="dropdown dropdown-end mr-2">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL
                          ? user.photoURL
                          : "https://i.ibb.co/qWrBVVB/index-1.png"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {
                    <>
                      <li className="text-center text-xl font-bold">
                        {user?.displayName ? user.displayName : user.email}
                      </li>
                      {/* TODO: Add a dashboard link */}
                      <li className="ml-4 text-xl font-semibold">
                        <NavLink to={"/dashboard/profile"}>DashBoard</NavLink>
                      </li>
                      <li
                        onClick={handelLogOut}
                        className="ml-4 text-xl font-semibold"
                      >
                        <button>Log out</button>
                      </li>
                    </>
                  }
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <button className="text-white hover:text-white border border-[#eb0029] hover:bg-[#eb0029] font-medium rounded-lg text-sm md:px-5 px-3  py-1 md:py-1.5 text-center mr-2 md:mr-3 ">
                  Login
                </button>
              </Link>
            )}

            <button
              onClick={handelDropdown}
              type="button"
              className="inline-flex items-center p-2 md:w-10 md:h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none ring-2 ring-gray-400 "
            >
              <svg
                className="md:w-5 w-4 md:h-5 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between w-1/2 hidden md:flex md:w-auto md:order-1"
            id="mobileManu"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-[#1b1d4d] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#1b1d4d] ">
              {navs}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
