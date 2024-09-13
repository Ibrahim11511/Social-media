/* eslint-disable react-hooks/exhaustive-deps */
import "@fontsource/poppins";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Cookies from "js-cookie";

function App() {
  const { setUser } = useContext(UserContext);
  const getUserFromCookies = () => {
    if (Cookies.get("user")) {
      return JSON.parse(Cookies.get("user"));
    }
    return {};
  };

  useEffect(() => {
    setUser(() => getUserFromCookies());
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
