import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import './Login.css';
import bg from './../../assets/fundo.jpg';

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
            <div className="w-screen h-screen bg-cover bg-center flex flex-col justify-center items-center" 
                style={{ backgroundImage: `url(${bg})` }} 
            >
    
                <div 
                    className="
                    bg-white/0
                    backdrop-blur-xl
                    rounded-2xl
                    p-10
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                    flex
                    gap-5
                    flex-col
                    justify-center
                    items-center">

                    <p className="font-sans text-white font-bold text-5xl mb-5">Login</p>
                    <input type="text" placeholder="Email" className="p-2.5 rounded-b-md text-title font-sans tracking-widest w-100 bg-input border-0  border-gray-200 focus:border-bg-primary focus:outline-none transition"/>
                    <input type="text" placeholder="Password" className="p-2.5 rounded-b-md text-title font-sans tracking-widest w-100 bg-input border-0  border-gray-200 focus:border-bg-primary focus:outline-none transition" />
                    <button className="bg-button w-full mt-6 px-6 py-2 rounded-lg outline-none focus:outline-none active:scale-98 transition">Login</button>
                </div>
            </div>
        </>
    )
}