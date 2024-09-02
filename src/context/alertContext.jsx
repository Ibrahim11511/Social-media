/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export let AlertContext = createContext({});

export function AlertContextProvider(props) {
  let [alertActive, setaAlertActive] = useState(false);

  const hideAlert = () => {
    setaAlertActive(false);
  };
  const showAlert = () => {
    setaAlertActive(true);
  };

  return (
    <AlertContext.Provider value={{ alertActive, hideAlert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}
