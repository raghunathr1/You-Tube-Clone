import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          name,
          email,
          password,
        },
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
    <div className="registerPage">
      <h1>Create Account </h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have Account ? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
    </div>
  );
}
export default Register;
