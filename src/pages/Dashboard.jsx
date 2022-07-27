import React from "react";
import { useNavigate } from "react-router";

export default function Dashboard({ token }) {
  const navigate = useNavigate();
  if (token) {
    return (
      <>
        <h1>Dashboard</h1>
      </>
    );
  }
  setTimeout(() => {
    navigate("/login");
  }, 100);
}
