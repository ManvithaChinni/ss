import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "player" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/signup", user);
      const { token, user: createdUser } = response.data;

      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Navigate to the respective dashboard
      if (createdUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/player-dashboard");
      }
    } catch (error) {
      alert(
        "Signup failed: " +
          (error.response?.data?.message || error.message || "An error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={styles.input}
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          style={styles.select}
        >
          <option value="player">Player</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleSignup} style={styles.button} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6b73ff, #000dff)",
    fontFamily: "'Roboto', sans-serif",
  },
  formContainer: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    width: "350px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    background: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#6b73ff",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Signup;
