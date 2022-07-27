import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthUser from "../AuthUser";

export default function Login({ token, save }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { http } = AuthUser();
  const submit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please Enter Email");
    } else {
      if (!password) {
        alert("Please Enter Password");
      } else {
        console.log("Email: ", email);
        console.log("Password: ", password);
        http
          .post("/login", { email: email, password: password })
          .then((res) => {
            console.log(res.data);
            if (res.data[0] === "success") {
              save(res.data[1].remember_token, res.data[1]);
              navigate("/dashboard");
            }
          });
      }
    }
  };
  if (token) {
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  }
  return (
    <>
      <h1>Login</h1>
      <form>
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Password: </label>
        <input
          type="password"
          autoComplete="true"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={(e) => submit(e)}>Login</button>
      </form>
    </>
  );
}
