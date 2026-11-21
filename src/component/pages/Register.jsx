
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://you-tube-clone-o7sb.onrender.com/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      alert(response.data.message || "Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="registerPage">
        <h1>Create Your VideoHub Account</h1>

        <p>
          Create an account to share and explore videos.
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

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
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {errorMessage && (
            <p role="alert" className="errorMessage">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>

        <p className="projectNotice">
          VideoHub is an independent video-sharing demo project.
          It is not affiliated with YouTube or Google.
        </p>
      </div>
    </div>
  );
}

export default Register;
