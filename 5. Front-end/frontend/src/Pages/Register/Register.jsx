function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
}

function Change(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
        ...prev,
        [name]: value,
    }))
}

export default function Register() {
    return (
        <>
            <div className="container">
                <div className="title">
                    <p id='title'>Register</p>
                </div>
                <div className="forms">
                    <p id="subtitle">Email</p>
                    <input type="text" name="email"/>
                    <p id="subtitle">Password</p>
                    <input type="text" name="password" />
                    <button type="submit">Register</button>
                </div>
            </div>
        </>
    )
}