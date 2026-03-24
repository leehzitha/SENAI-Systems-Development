import React, { useState } from "react";
import "./Register.css";

interface FormData {
  email: string;
  password: string;
  name: string
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    name: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setForm({ email: "", password: "", name: ""});
      } else {
        setMessage(data.message || "Erro ao registrar");
      }
    } catch (error) {
      setMessage("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="container">
      <div className="forms">
        <div className="title">
          <p id="title">Register</p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}