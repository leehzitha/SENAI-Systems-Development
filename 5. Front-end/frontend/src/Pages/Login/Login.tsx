import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

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
}