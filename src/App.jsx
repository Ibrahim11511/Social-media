import "@fontsource/poppins";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
