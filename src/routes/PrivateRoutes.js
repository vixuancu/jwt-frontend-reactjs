import { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    console.log("chekc context user:", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("./login");
      window.location.reload(); // tạm thời thôi
    }
    if (session) {
      // check role
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component}></Route>
    </>
  );
};
export default PrivateRoutes;
