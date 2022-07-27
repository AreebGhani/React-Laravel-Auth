import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../AuthUser";

export default function Registration({ token }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { http } = AuthUser();
  const submit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please Enter Username");
    } else {
      if (!email) {
        alert("Please Enter Email");
      } else {
        if (!password) {
          alert("Please Enter Password");
        } else {
          console.log("Name:", name);
          console.log("Email: ", email);
          console.log("Password: ", password);
          http
            .post("/register", {
              name: name,
              email: email,
              password: password,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data === "success") {
                navigate("/login");
              }
            });
        }
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
      <h1>Registration</h1>
      <form>
        <br />
        <label>Username: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
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
        <button onClick={(e) => submit(e)}>Signup</button>
      </form>
    </>
  );
}
