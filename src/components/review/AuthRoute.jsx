import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

const Component = (props) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext.isAuth) {
      props.history.push("/login");
    }
  }, []);

  return <div>test</div>;
};

export default Component;
