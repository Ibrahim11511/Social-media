/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export default function LogIn() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigateToHome = useNavigate();
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const handelLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://tarmeezacademy.com/api/v1/login", loginValues)
      .then((response) => {
        Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
        toast.success("Login Successfully");
        navigateToHome("/home");
      })
      .catch(function (error) {
        Object.entries(error.response.data.errors).map(([, value]) =>
          toast.error(`${value}`)
        );
      });
  };
  return (
    <div className={`${Styles.logIn}`}>
      <form onSubmit={(e) => handelLogin(e)}>
        <h2>login to account</h2>
        <input
          type="text"
          placeholder="Enter Your User Name..."
          onChange={(e) =>
            setLoginValues((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <span className={Styles.passwordWrapper}>
          <input
            autoComplete="password"
            onChange={(e) =>
              setLoginValues((prev) => ({ ...prev, password: e.target.value }))
            }
            type={`${passwordVisibility ? "text" : "password"}`}
            placeholder="Enter Your Password..."
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
          If you didn't have an account click{" "}
          <Link to={"/auth/register"}>here...</Link>
        </p>
        <input type="submit" value={"LOGIN"} />
      </form>
    </div>
  );
}
