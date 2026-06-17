import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("username", response.data.name);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
    <div className="authContainer">
      <h1>Sing In </h1>
      <input
        type="email"
        placeholder="Enter E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>
      <p>
        Dont have Account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
