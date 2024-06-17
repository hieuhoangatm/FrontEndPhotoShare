import React, { useState } from "react";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [unsuccessMessage, setUnsuccessMessage] = useState("");
  const navigate = useNavigate();

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setLocation("");
    setDescription("");
    setOccupation("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem tất cả các trường đã được điền vào
    const newErrors = [];
    if (!first_name) newErrors.push("First name is required");
    if (!last_name) newErrors.push("Last name is required");
    if (!location) newErrors.push("Location is required");
    if (!description) newErrors.push("Description is required");
    if (!occupation) newErrors.push("Occupation is required");
    if (!username) newErrors.push("Username is required");
    if (!password) newErrors.push("Password is required");
    if (!confirmPassword) newErrors.push("Confirm password is required");

    // Kiểm tra mật khẩu khớp với xác nhận mật khẩu
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    // Nếu có lỗi, cập nhật state errors và kết thúc
    if (newErrors.length > 0) {
      setErrors(newErrors);
      clearFields(); // Xóa các trường nhập
      return;
    }

    // Nếu không có lỗi, tiếp tục xử lý việc đăng ký người dùng
    const userData = {
      first_name,
      last_name,
      location,
      description,
      occupation,
      username,
      password,
      confirmPassword,
    };
    
    try {
      const response = await fetch(
        "http://localhost:8081/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      setSuccessMessage("You have successfully registered an account!");
      clearFields(); // Xóa các trường nhập
      // Xử lý phản hồi thành công ở đây (ví dụ: chuyển hướng người dùng)
      // navigate("home");
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error.message);
      setUnsuccessMessage("Username already exists!");
      clearFields(); // Xóa các trường nhập
      // Xử lý lỗi và thông báo cho người dùng
    }
  };

  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        {unsuccessMessage && (
          <div className="unsuccess-message">
            <p>{unsuccessMessage}</p>
          </div>
        )}
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <label>
          First name:
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
