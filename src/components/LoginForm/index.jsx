import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8081/admin/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (response.ok) {
        // const userData = await response.json();
        // localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin đăng nhập vào localStorage
        onLogin && onLogin({ username: creds.username });
        navigate("/myprofile");
      } else {
        setError("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
      <p>
        If you don't have an account, <Link to="/register">register here</Link>.
      </p>
    </div>
  );
}

export default LoginForm;
