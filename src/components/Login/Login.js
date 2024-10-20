import "./Login.scss";
const Login = (props) => {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left col-7 ">
            <div className="brand">Facebook</div>
            <div className="detail">
              learning everything learning everything learning everything
              learning everything learning everything learning everything
            </div>
          </div>
          <div className="content-right col-5  d-flex flex-column gap-2 py-3">
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
            <span className="text-center">forgot your password?</span>
            <hr />
            <div className="text-center">
              {" "}
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
