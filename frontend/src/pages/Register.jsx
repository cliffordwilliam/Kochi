import React, { useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (data, isOk) => {
    if (isOk) {
    } else {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      APIrequest({
        method: "POST",
        apiEndpoint: `${c.BaseUrl}/user/register`,
        options: {
          data: {
            username: formData.username,
            password: formData.password,
          },
        },
        callback: handleRegister,
      })
    );
  };

  return (
    <main>
      <div>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            // go to home
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}
