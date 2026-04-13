import { useState } from "react";
import "./Register.css";
import axios from "axios";
import Swal from "sweetalert2";
import bg from './../../assets/fundo.jpg';

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
    <div className="w-screen h-screen gap-10 bg-linear-to-t from-bg-primary via-bg-secondary from-10% via-30% to-60% to-bg-terciary flex-col flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="
        bg-white/1
        backdrop-blur-xl
        p-10 w-230
        flex flex-row
        rounded-2xl
        justify-between">

        <div className="flex flex-col h-full items-center justify-center">
        <p className="text-6xl font-bold font-sans text-white">REGISTER</p>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            className=" border-0 tracking-widest text-white border-b-gray-200 border-b-2 focus:border-bg-primary focus:outline-none p-4 pl-0 transition"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className=" border-0 tracking-widest text-white border-b-gray-200 border-b-2 focus:border-bg-primary focus:outline-none p-4 pl-0 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className=" border-0 tracking-widest text-white border-b-gray-200 border-b-2 focus:border-bg-primary focus:outline-none w-100 p-4 pl-0 transition"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button 
            type="submit"
            onClick={handleRegister}
            className="bg-bg-primary mt-5">Register</button>
        </div>
      </div>
    </div>
  );
}