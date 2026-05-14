import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import './Login.css'
import Swal from 'sweetalert2';

export const Login = () => {  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password
            })

            sessionStorage.setItem('token', response.data.token)
            
            console.log(response.data)
            navigate("/")
            return Swal.fire({
                title: "Sucess!",
                text: "Login efetuado com sucesso",
                icon: "success"
            })
        
        } catch (error: any) {
            return Swal.fire({
                title: "Error",
                text: "Email ou Senha invalidos",
                icon: "error"
            })
        }
    }

    return(
        <>
            <div className="box-login">
                <h1>Login</h1>
                <div className='box-input'>
                    <div className='box-input'>
                        <h3>Email</h3>
                        <input onChange={(e) => setEmail(e.target.value)} className='input' ></input>
                    </div>
                    <div className='box-input'>
                        <h3>Senha</h3>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' className='input'></input>
                    </div>
                </div>
                <button onClick={() => login()}>Entrar</button>
            </div>

        </>
    )
}