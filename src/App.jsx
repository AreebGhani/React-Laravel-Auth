import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AuthUser from "./AuthUser";

export default function App() {
  var getToken;
  if (localStorage.getItem("token")) {
    getToken = JSON.parse(localStorage.getItem("token"));
  } else {
    getToken = "";
  }
  var getUser;
  if (localStorage.getItem("token")) {
    getUser = JSON.parse(localStorage.getItem("user"));
  } else {
    getUser = "";
  }
  const [token, setToken] = useState(getToken);
  const [user, setUser] = useState(getUser);
  const save = (token, user) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };
  useEffect(() => {
    setToken(getToken);
    console.log("useEffect", getToken);
  }, [getToken, getUser, setToken, setUser]);

  const logout = () => {
    localStorage.clear();
    setToken("");
    setUser("");
  };
  const navigate = useNavigate();
  const { http } = AuthUser();
  const logoutUser = () => {
    http.post("/logout").then((res) => {
      console.log(res.data);
      if (res.data === "success") {
        logout();
        navigate("/login");
      }
    });
  };
  return (
    <>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li style={{ margin: "15px" }}>
          <NavLink to="/home">Home</NavLink>
        </li>
        {token ? (
          <>
            <li style={{ margin: "15px" }}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li style={{ margin: "15px" }}>
              <NavLink to="" onClick={logoutUser}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li style={{ margin: "15px" }}>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li style={{ margin: "15px" }}>
              <NavLink to="/registration">Registration</NavLink>
            </li>
          </>
        )}
      </ul>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route
          exact
          path="/dashboard"
          element={<Dashboard token={token} user={user} save={save} />}
        />
        <Route
          exact
          path="/login"
          element={<Login token={token} user={user} save={save} />}
        />
        <Route
          exact
          path="/registration"
          element={<Registration token={token} user={user} />}
        />
      </Routes>
    </>
  );
}
