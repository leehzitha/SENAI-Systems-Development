import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {name, email, password})
      Swal.fire({
        title: "Good job!",
        text: "User registered!",
        icon: "success"
      })
    } catch {
      Swal.fire({
        title: "Error",
        text: "Error while creating user",
        icon: "error"
      })
    }
  }



  return (
    <div className="container">
      <div className="forms">
        <div className="title">
          <p id="title">Register</p>
        </div>
        <div className="form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}