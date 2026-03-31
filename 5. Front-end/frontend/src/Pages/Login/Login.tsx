import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            console.log(response.data);

            sessionStorage.setItem('token', response.data.token);

            return Swal.fire({
                title: "Success!",
                text: "Login",
                icon: "success"
            });
        } catch {
            return Swal.fire({
                title: "Error!",
                text: "Login failed",
                icon: "error"
            })
        }
    }

    return (
        <>
            <div className="w-screen h-screen gap-10 bg-linear-to-t from-bg-primary via-bg-secondary from-10% via-30% to-60% to-bg-terciary flex-col flex justify-center items-center">
    
                <p className="font-sans font-bold text-7xl">LOGIN</p>
                <div className="bg-white shadow-[0px_40px_70px_rgba(0,0,0,0.1)] p-12 rounded-2xl flex flex-col gap-3.5">

                    <input type="text" placeholder="Email" className="p-1.5 text-font font-sans tracking-widest w-100 bg-transparent border-0 border-b-2  border-gray-200 focus:border-bg-primary focus:outline-none transition"/>
                    <input type="text" placeholder="Password" className="p-1.5 text-font font-sans tracking-widest  w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-bg-primary focus:outline-none transition" />
                    <button className="bg-bg-primary mt-6 px-6 py-2 rounded-lg outline-none focus:outline-none active:scale-98 transition">Login</button>
                </div>
            </div>
        </>
    )
}