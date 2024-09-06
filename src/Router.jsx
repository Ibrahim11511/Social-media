import { createBrowserRouter } from "react-router-dom";
import LogIn from "./Pages/log in Page/LogIn";
import Register from "./Pages/Register Page/Register";
import Home from "./Pages/Home Page/Home";
import Protected from "./Protected";
import MasterRoot from "./MasterRoot";
import AuthRoot from "./AuthRoot";
import SinglePage from "./Pages/Single Page/SinglePage";
import CreatePost from "./Pages/Create Post/CreatePost";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Protected>
        <MasterRoot />
      </Protected>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "profile", element: <SinglePage /> },
      { path: "createpost", element: <CreatePost /> },
    ],
  },
  {
    path: "auth",
    element: <AuthRoot />,
    children: [
      { index: true, element: <LogIn /> },
      { path: "login", element: <LogIn /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export { router };
4;
