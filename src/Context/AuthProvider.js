import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [paid, setPaid] = useState(0);

  // const navigate = useNavigate();

  // register

  // const createUser = async (userInfo) => {
  //   setLoading(true);
  //   try {
  //     const url = "https://power-hack-six.vercel.app/api/registration";
  //     await axios.post(url, userInfo);
  //     setLoading(false);
  //     // navigate("/login");
  //     setErr(null);
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setErr(error.response.data.message);
  //     }
  //     setLoading(false);
  //   }
  // };

  const LogIn = async (userInfo) => {
    setLoading(true);
    setPaid(0);
    try {
      const url = "https://power-hack-six.vercel.app/api/login";
      const { data: res } = await axios.post(url, userInfo);
      localStorage.setItem("token", res.data);
      setUser(res.user);
      // window.location = "/";
      setPaid(0);
      setLoading(false);
      setErr(null);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.message);
        setPaid(0);
        setLoading(false);
      }
    }
  };

  const LogOut = () => {
    setPaid(0);
    localStorage.removeItem("token");
  };

  const Info = {
    err,
    loading,
    user,
    // createUser,
    paid,
    setPaid,
    LogIn,
    LogOut,
  };

  return (
    <div>
      <AuthContext.Provider value={Info}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
