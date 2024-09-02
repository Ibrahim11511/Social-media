/* eslint-disable react-hooks/exhaustive-deps */
import "@fontsource/poppins";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";
import { useContext, useEffect } from "react";
import { router } from "./Router";
import Cookies from "js-cookie";

const getUserFromCookies = () => {
  if (Cookies.get("user")) {
    return JSON.parse(Cookies.get("user"));
  }
  return {};
};

function App() {
  let { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(getUserFromCookies());
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
