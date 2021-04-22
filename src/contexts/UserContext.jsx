import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [isAuth, setIsAuth] = useState(false);

  const test = () => {
    console.log("this is a test");
  };

  const providerValue = {
    token,
    setToken,
    isAuth,
    setIsAuth,
    test,
  };

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
