import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.name);

      alert(data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
  );
}

export default Login;
