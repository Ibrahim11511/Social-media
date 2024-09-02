/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export let UserContext = createContext({});

export function UserContextProvider(props) {
  let [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
