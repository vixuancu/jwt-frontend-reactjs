import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/test-api").then((data) => {
  //     console.log("check data axios :", data);
  //   });
  // }, []);
  const isValidInputs = () => {
    if (!email) {
      toast.error("email is required");
      return false;
    }
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regx.test(email)) {
      // returns a boolean
      toast.error("please enter a valid email address");
      return false;
    }

    if (!phone) {
      toast.error("phone is required");
      return false;
    }
    if (!username) {
      toast.error("username is required");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("Your  password is not the same");
      return false;
    }
    return true;
  };
  const handleRegister = () => {
    let check = isValidInputs();
    // viet tat object userData key=value
    let userData = { email, phone, username, password };

    console.log("check user data ", userData);
  };
  return (
    <div className="register-container ">
      <div className="container">
        <div className="row px-3 p-sm-0 ">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
            <div className="brand">Facebook</div>
            <div className="detail">
              learning everything learning everything learning everything
              learning everything learning vixuancu vixuancu
            </div>
          </div>

          <div className="content-right col-sm-5 col-12  d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Facebook</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email address ?"
              />
            </div>
            <div className="form-group">
              <label>PhoneNumber:</label>
              <input
                type="text"
                className="form-control"
                placeholder="PhoneNumber ?"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name ?"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

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
