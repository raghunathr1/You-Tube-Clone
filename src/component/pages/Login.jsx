import { useState } from "react"
import { Link } from "react-router-dom"

function Login(){
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const handleLogin = ()=>{

        }
    return (
        <div className="authContainer">
            <h1>Sing In </h1>
            <input type="email" placeholder="Enter E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Submit</button>
            <p>Dont have Account? <Link to="/register">Register</Link></p>
        </div>
    )
}
export default Login