import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user__name, setuser__name] = useState("");
  const navigateToLogIn = useNavigate("");
  useEffect(() => {
    setuser__name(JSON.parse(Cookies.get("user")).user.name);
  }, []);
  const handelLogOut = () => {
    Cookies.remove("user");
    navigateToLogIn("auth");
  };
  return (
    <nav className="navBar">
      <ul className="navBar_list">
        <li className="navBarItem">
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        <li className="navBarItem">
          <NavLink to={""}>My Posts</NavLink>
        </li>
      </ul>
      <div className="info">
        <span className="name">{user__name}</span>
        <button className="logOutBtn" onClick={handelLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
