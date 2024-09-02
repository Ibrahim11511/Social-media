import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navBar">
      <ul className="navBar_list">
        <li className="navBarItem">
          <NavLink to={"/home"}>Home</NavLink>
        </li>
      </ul>
    </nav>
  );
}
