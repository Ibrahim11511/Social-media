/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";

export default function Root() {
  let { user, setUser } = useContext(UserContext);
  const getUserFromCookies = () => {
    return JSON.parse(Cookies.get("user"));
  };

  useEffect(() => {
    setUser(() => getUserFromCookies());
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
