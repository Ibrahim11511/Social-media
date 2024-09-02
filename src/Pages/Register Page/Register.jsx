import { Link, useNavigate } from "react-router-dom";
import Styles from "../log in Page/login.module.css";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function Register() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigateToHome = useNavigate();
  const handelLogin = (e) => {
    e.preventDefault();
    navigateToHome("/home");
  };
  return (
    <div className={`${Styles.logIn}`}>
      <form onSubmit={(e) => handelLogin(e)}>
        <h2>Create new account</h2>
        <input type="text" name="name" placeholder="Enter Your Name..." />
        <input
          type="text"
          name="userName"
          placeholder="Enter Your User Name..."
        />
        <input type="file" name="picture" />
        <span className={Styles.passwordWrapper}>
          <input
            type={`${passwordVisibility ? "text" : "password"}`}
            name="password"
            placeholder="Enter Your Password..."
            autoComplete="password"
          />
          <FaEye
            style={
              passwordVisibility ? { display: "none" } : { display: "block" }
            }
            onClick={() => setPasswordVisibility(true)}
          />
          <FaEyeSlash
            style={
              passwordVisibility ? { display: "block" } : { display: "none" }
            }
            onClick={() => setPasswordVisibility(false)}
          />
        </span>
        <p>
          If you already have account click <Link to={"/login"}>here...</Link>
        </p>
        <input type="submit" value={"SIGN UP"} />
      </form>
    </div>
  );
}
