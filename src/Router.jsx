import { createBrowserRouter } from "react-router-dom";
import LogIn from "./Pages/log in Page/LogIn";
import Register from "./Pages/Register Page/Register";
import Home from "./Pages/Home Page/Home";
import Protected from "./Protected";
import MasterRoot from "./MasterRoot";
import AuthRoot from "./AuthRoot";
import SinglePage from "./Pages/Profile Page/ProfilePage";
import CreatePost from "./Pages/Create Post/CreatePost";
import PostPage from "./Pages/Post Page/PostPage";
import EditPage from "./Pages/Edit Page/EditPage";

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
      { path: "profilePage/:user__ID", element: <SinglePage /> },
      { path: "createPost", element: <CreatePost /> },
      { path: "postPage/:post__ID", element: <PostPage /> },
      { path: "editPage", element: <EditPage /> },
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
