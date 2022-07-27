import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default function AuthUser() {
  return {
    http,
  };
}
