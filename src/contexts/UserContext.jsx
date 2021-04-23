import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  let [token, setToken] = useState(null);
  let [isAuth, setIsAuth] = useState(false);
  let [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      fetch(`http://${window.env.SERVER_API_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            setToken(null);
            setIsAuth(false);
            localStorage.removeItem("token");
          }

          return res.json();
        })
        .then((res) => {
          if (res.user) {
            setUser(res.user);
            setIsAuth(true);
          }
        });
    } else {
      setUser({});
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, isAuth, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
