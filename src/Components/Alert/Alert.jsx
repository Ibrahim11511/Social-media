/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./alert.css";
import { AlertContext } from "../../context/alertContext";

export default function Alert({ message, type = "success" }) {
  const { alertActive } = useContext(AlertContext);
  return (
    <div
      className={`alertWrapper ${alertActive ? "active" : ""}`}
      style={
        type === "error"
          ? { backgroundColor: "var(--red)" }
          : { backgroundColor: "var(--dark-blue)" }
      }
    >
      <p>{message}</p>
    </div>
  );
}
