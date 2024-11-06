import "./Login.scss";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  let history = useHistory();
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
              learning everything learning everything learning everything
            </div>
          </div>

          <div className="content-right col-sm-5 col-12  d-flex flex-column gap-2 py-3 ">
            <div className="brand d-sm-none">Facebook</div>
            <input
              type="text"
              className="form-control"
              placeholder="email address or phone number ?"
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
            />
            <button className="btn btn-primary">Login</button>
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
