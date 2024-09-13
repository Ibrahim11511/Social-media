/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export let ForcedRender = createContext({});

export function ForcedRenderProvider(props) {
  const [forcedRender, setForcedRender] = useState(true);

  return (
    <ForcedRender.Provider value={{ forcedRender, setForcedRender }}>
      {props.children}
    </ForcedRender.Provider>
  );
}
