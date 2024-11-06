import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register/Register";
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav /> */}
        <Switch>
          <Route path="/news">news</Route>
          <Route path="/contact">contact</Route>
          <Route path="/about">about</Route>
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
      </div>
    </Router>
  );
}

export default App;
