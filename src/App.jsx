/* eslint-disable react-hooks/exhaustive-deps */
import "@fontsource/poppins";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";
import { useContext, useEffect } from "react";
import { router } from "./Router";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const getUserFromCookies = () => {
    if (Cookies.get("user")) {
      return JSON.parse(Cookies.get("user"));
    }
    return {};
  };
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(() => getUserFromCookies());
    console.log(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
