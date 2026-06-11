import { useState } from "react"
import { Link } from "react-router-dom"

function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = ()=>{
            
        }
    return (
        <div className="authContainer">
            <h1>Create Account </h1>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder="Enter E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Register</button>
            <p>Already have Account ? <Link to="/login">Login</Link> </p>
        </div>
    )
}
export default Register