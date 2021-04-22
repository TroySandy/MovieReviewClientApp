import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  let [token, setToken] = useState("");
  let [isAuth, setIsAuth] = useState(false);

  const providerValue = {
    token,
    setToken,
    isAuth,
    setIsAuth,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
