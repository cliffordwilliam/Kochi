import React, { useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { useDispatch } from "react-redux";

export default function Login() {
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

  const handleApi = (data, isOk) => {
    if (isOk) {
      // Save token to mem
      console.log(data);
      localStorage.setItem("token", data.token);
      // go to home
      navigate("/");
    } else {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      APIrequest({
        method: "POST",
        apiEndpoint: `${c.BaseUrl}/user/login`,
        options: {
          data: {
            username: formData.username,
            password: formData.password,
          },
        },
        callback: handleApi,
      })
    );
  };

  return (
    <main>
      <div>
        <h1>Login Form</h1>
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
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </main>
  );
}
