import { Link, useNavigate } from "react-router-dom";
import Styles from "../log in Page/login.module.css";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { AlertContext } from "../../context/alertContext";
import Alert from "../../Components/Alert/Alert";
export default function Register() {
  const [registerValues, setRegisterValues] = useState({
    name: "User",
    username: "",
    image: "/public/8380015-removebg-preview.png",
    password: "",
    email: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  let formData = new FormData();
  const { alertActive, hideAlert, showAlert } = useContext(AlertContext);
  const [errors, setErrors] = useState("");
  const navigateToHome = useNavigate();

  const handelRegister = (e) => {
    formData.append("name", registerValues.name);
    formData.append("username", registerValues.username);
    formData.append("image", registerValues.image);
    formData.append("password", registerValues.password);
    formData.append("email", registerValues.email);
    e.preventDefault();
    axios
      .post("https://tarmeezacademy.com/api/v1/register", formData)
      .then((response) => {
        console.log(response);
        Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
        navigateToHome("/home");
      })
      .catch(function (error) {
        console.log(error);
        setErrors(
          Object.entries(error.response.data.errors)
            .map(([, value]) => `${value}`)
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
    <div className={`${Styles.register}`}>
      {alertActive ? (
        <>
          <Alert message={`${JSON.stringify(errors)}`} type="error" />
          {handelHideAlert()}
        </>
      ) : null}
      <form onSubmit={handelRegister}>
        <h2>Create new account</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name..."
          onChange={(e) =>
            setRegisterValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          name="userName"
          placeholder="Enter Your User Name..."
          onChange={(e) =>
            setRegisterValues((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <div className={Styles.pictureWrapper}>
          <input
            type="file"
            className={Styles.inputfile}
            name="picture"
            id="file"
            onChange={(e) =>
              setRegisterValues((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
            }
          />
          <label htmlFor="file">Choose Your Profile Picture</label>
          <div className={Styles.image}>
            <img src={registerValues.image} alt="Preview picture" />
          </div>
        </div>
        <span className={Styles.passwordWrapper}>
          <input
            type={`${passwordVisibility ? "text" : "password"}`}
            name="password"
            placeholder="Enter Your Password..."
            autoComplete="password"
            onChange={(e) =>
              setRegisterValues((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
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
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          autoComplete="email"
          onChange={(e) =>
            setRegisterValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <p>
          If you already have account click{" "}
          <Link to={"/auth/login"}>here...</Link>
        </p>
        <input type="submit" value={"SIGN UP"} />
      </form>
    </div>
  );
}
