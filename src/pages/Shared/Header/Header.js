import React, { useContext } from "react";
import { FaSuperpowers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Header = () => {
  const { LogOut, paid, user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const menuItems = (
    <>
      <h1>Total Paid Amount: {paid} </h1>
    </>
  );

  const handleLogOut = () => {
    LogOut();
    navigate("/login");
  };

  return (
    <div className="navbar  dark:bg-[#570df8] dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#570df8] rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <span>
            {" "}
            <FaSuperpowers />{" "}
          </span>
          Power Hack
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <>
          {!user || !token ? (
            <>
              <Link
                to="/login"
                className="btn btn-outline border-white text-white hover:text-[#570df8] hover:bg-white hover:border-white"
              >
                Log In
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogOut}
                className="btn btn-outline border-white text-white hover:text-[#570df8] hover:bg-white hover:border-white"
              >
                Sign Out
              </button>{" "}
            </>
          )}
        </>

        {/* <div>
          <label
            htmlFor="my-drawer-2"
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
