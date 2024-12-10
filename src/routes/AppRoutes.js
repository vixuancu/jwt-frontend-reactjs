import { Switch, Route } from "react-router-dom";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
const AppRoutes = (props) => {
  /*
    [/users/show,/users/update]

    */
  const Project = () => {
    return <>Project</>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>
        <Route path="*" exact>
          404 not found
        </Route>
      </Switch>
    </>
  );
};
export default AppRoutes;
