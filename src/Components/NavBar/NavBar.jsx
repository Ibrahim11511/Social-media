import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [userName, setUserName] = useState("");
  const Navigate = useNavigate("");
  const handelLogOut = () => {
    Cookies.remove("user");
    Cookies.remove("password");
    Navigate("auth");
  };
  useEffect(() => {
    setUserName(() => JSON.parse(Cookies.get("user")));
  }, []);
  return (
    <nav className="navBar">
      <ul className="navBar_list">
        <li className="navBarItem">
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={`/profilePage/${userName?.user?.id}`}>Profile</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={"/createPost"}>Create Post</NavLink>
        </li>
      </ul>
      <div className="info">
        <Link to={"/editPage"} className="name">
          {userName?.user?.name}
        </Link>
        <button className="logOutBtn" onClick={handelLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
