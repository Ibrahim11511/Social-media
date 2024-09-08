import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function NavBar() {
  const { user } = useContext(UserContext);
  const Navigate = useNavigate("");
  const handelLogOut = () => {
    Cookies.remove("user");
    Navigate("auth");
  };
  return (
    <nav className="navBar">
      <ul className="navBar_list">
        <li className="navBarItem">
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={`/profilePage/${user?.user?.id}`}>Profile</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={"/createPost"}>Create Post</NavLink>
        </li>
      </ul>
      <div className="info">
        <span className="name">{user?.user?.name}</span>
        <button className="logOutBtn" onClick={handelLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
