import { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/UserService";
const Login = (props) => {
  let history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      toast.error("please enter your email address or phone number  ");
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      return;
    }
    if (!password) {
      toast.error("please enter your password ");
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      return;
    }
    let res = await loginUser(valueLogin, password);
    console.log("check res:", res.data);
    if (res && res.data && res.data.EC === 0) {
      //success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      history.push("/users");
      toast.success(res.data.EM);
    }
    if (res && res.data && res.data.EC !== 0) {
      // error
      toast.error(res.data.EM);
    }
  };
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  return (
    <div className="login-container ">
      <div className="container">
        <div className="row px-3 p-sm-0 ">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
            <div className="brand">Facebook</div>
            <div className="detail">
              learning everything learning everything learning everything
              learning everything learning everything learning everything s
            </div>
          </div>

          <div className="content-right col-sm-5 col-12  d-flex flex-column gap-2 py-3 ">
            <div className="brand d-sm-none">Facebook</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="email address or phone number ?"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              {" "}
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                {/* <Link to="/register">Create new account</Link> */}
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
