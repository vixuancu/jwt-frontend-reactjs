import "./App.scss";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./components/Navigation/NavHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Audio } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
function App(props) {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading === true ? (
          <div className="loading">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="red"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          <>
            <div className="app-header">
              <NavHeader />
            </div>

            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Bounce}
      />
    </>
  );
}

export default App;
