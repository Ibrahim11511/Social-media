/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Protected({ children }) {
  if (Cookies.get("user")) {
    return children;
  } else return <Navigate to="/auth" replace />;
}
