import React from "react";
import { FaSuperpowers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center pb-5 p-10 bg-primary text-primary-content">
      <div>
        <Link to={"/"} className="flex items-center justify-center">
          <span className="text-4xl font-bold">
            {" "}
            <FaSuperpowers />{" "}
          </span>
          <span className="text-2xl font-bold">Power Pack</span>
        </Link>
        <p className="font-bold">
          Power Pack Industries Ltd. <br />
          Providing reliable tech since 2222
        </p>
        <p>Copyright © 2022 - All right reserved by Power Pack</p>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
