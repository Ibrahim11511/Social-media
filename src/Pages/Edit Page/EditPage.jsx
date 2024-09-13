import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Styles from "./editpage.module.css";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/userContext";
export default function EditPage() {
  const { user } = useContext(UserContext);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState(false);
  const [newData, setNewData] = useState({
    username: "",
    password: "",
    currentPassword: "",
  });
  const getUserPassword = () => {
    return Cookies.get("password");
  };

  const handelDataUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newData.username) formData.append("username", newData.username);
    if (newData.password) formData.append("password", newData.password);
    const headers = {
      "Content-type": "multipart/form-data",
      authorization: `Bearer ${user.token}`,
    };
    const storedPassword = getUserPassword().slice(1, -1);
    console.log(storedPassword);
    switch (newData.currentPassword) {
      case "":
        toast.error("You Must Enter Your Current Password");
        break;
      case `${storedPassword}`:
        axios
          .put("https://tarmeezacademy.com/api/v1/updatePorfile", formData, {
            headers: headers,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        break;
      default:
        toast.error("Your Current Password Wrong");
    }
  };
  return (
    <div className={Styles.EditPage}>
      <h1>Edit Your Profile</h1>
      <form onSubmit={handelDataUpdate}>
        <input
          className={Styles.newUserName}
          type="text"
          placeholder="New User Name..."
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <span className={Styles.passwordContainer}>
          <input
            type={`${passwordVisibility ? "text" : "password"}`}
            name="password"
            placeholder="New Password..."
            autoComplete="password"
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, password: e.target.value }))
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
        <span className={Styles.passwordContainer}>
          <input
            type={`${currentPasswordVisibility ? "text" : "password"}`}
            placeholder="Current Password..."
            onChange={(e) =>
              setNewData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />
          <FaEye
            style={
              currentPasswordVisibility
                ? { display: "none" }
                : { display: "block" }
            }
            onClick={() => setCurrentPasswordVisibility(true)}
          />
          <FaEyeSlash
            style={
              currentPasswordVisibility
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={() => setCurrentPasswordVisibility(false)}
          />
        </span>
        <input type="submit" value={"Submit"} />
      </form>
    </div>
  );
}
