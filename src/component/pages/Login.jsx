
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://you-tube-clone-o7sb.onrender.com/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      if (!response.data.token) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.name);

      alert(response.data.message || "Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "Unable to login. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="authContainer">
        <h1>Sign In to VideoHub</h1>

        <p>
          Welcome back! Sign in to access your video-sharing account.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {errorMessage && (
            <p role="alert" className="errorMessage">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

        <p className="projectNotice">
          VideoHub is an independent video-sharing demo project.
          It is not affiliated with YouTube or Google.
        </p>
      </div>
    </div>
  );
}

export default Login;
