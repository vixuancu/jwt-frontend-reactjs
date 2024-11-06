import "./Register.scss";
import { useHistory } from "react-router-dom";
const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div className="register-container ">
      <div className="container">
        <div className="row px-3 p-sm-0 ">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
            <div className="brand">Facebook</div>
            <div className="detail">
              learning everything learning everything learning everything
              learning everything learning everything learning everything
            </div>
          </div>

          <div className="content-right col-sm-5 col-12  d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Facebook</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="email address ?"
              />
            </div>
            <div className="form-group">
              <label>PhoneNumber:</label>
              <input
                type="text"
                className="form-control"
                placeholder="PhoneNumber ?"
              />
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name ?"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
              />
            </div>

            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              {" "}
              <button className="btn btn-success" onClick={() => handleLogin()}>
                {/* <Link to="/register">Create new account</Link> */}
                already've an account .Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
