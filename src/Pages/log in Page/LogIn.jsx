/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import Alert from "../../Components/Alert/Alert";
import { AlertContext } from "../../context/alertContext";
export default function LogIn() {
  const [errors, setErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { alertActive, hideAlert, showAlert } = useContext(AlertContext);

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
        navigateToHome("/home");
      })
      .catch(function (error) {
        setErrors(
          Object.entries(error.response.data.errors)
            .map(([key, value]) => `${key}: ${value[0]}`)
            .join(" ")
        );
        showAlert();
      });
  };
  const handelHideAlert = () => {
    setTimeout(() => {
      hideAlert();
    }, 8000);
  };
  return (
    <div className={`${Styles.logIn}`}>
      {alertActive ? (
        <>
          <Alert message={`${JSON.stringify(errors)}`} type="error" />
          {handelHideAlert()}
        </>
      ) : null}
      <form onSubmit={(e) => handelLogin(e)}>
        <h2>login to account</h2>
        <input
          type="text"
          name="username"
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
            name="password"
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
