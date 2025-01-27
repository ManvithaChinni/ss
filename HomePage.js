// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "2rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
    },
    button: {
      margin: "0.5rem",
      padding: "0.8rem 2rem",
      fontSize: "1rem",
      color: "#fff",
      background: "rgba(255, 255, 255, 0.2)",
      border: "2px solid #fff",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      background: "#fff",
      color: "#2c3e50",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sports Scheduler</h1>
      <div>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style = { ...styles.buttonHover })}
          onMouseOut={(e) => (e.target.style = { ...styles.button })}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style = { ...styles.buttonHover })}
          onMouseOut={(e) => (e.target.style = { ...styles.button })}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
