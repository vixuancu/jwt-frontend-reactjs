import "./Register.scss";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/UserService";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log("check data axios :", data);
    // });
  }, []);
  const isValidInputs = () => {
    setObjectCheckInput(defaultValidInput);
    if (!email) {
      toast.error("email is required");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regx.test(email)) {
      // returns a boolean
      toast.error("please enter a valid email address");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!phone) {
      toast.error("phone is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!username) {
      toast.error("username is required");
      setObjectCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }
    if (!password) {
      toast.error("password is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password != confirmPassword) {
      toast.error("Your  password is not the same");
      setObjectCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    let check = isValidInputs();
    if (check === true) {
      let res = await registerNewUser(email, phone, username, password);
      let serverData = res.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  return (
    <div className="register-container ">
      <div className="container">
        <div className="row px-3 p-sm-0 ">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
            <div className="brand">Facebook</div>
            <div className="detail">
              learning everything learning everything learning everything
              learning everything learning vixuancu vixuan
            </div>
          </div>

          <div className="content-right col-sm-5 col-12  d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Facebook</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email address ?"
              />
            </div>
            <div className="form-group">
              <label>PhoneNumber:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="PhoneNumber ?"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="User name ?"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
