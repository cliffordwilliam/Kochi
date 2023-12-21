import React, { useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { setTargetPage } from "../store/curtainSlice";
import { setContent } from "../store/modalSlice";

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
      dispatch(setContent({ content: data.msg, isOn: true }));
    } else {
      console.log(data.response.data.msg, "ERROR");
      dispatch(setContent({ content: data.response.data.msg, isOn: true }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setContent({ content: "Loading or no data", isOn: true }));
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
    <main className="cc">
      <div className="v-flex panel">
        <h1 className="t">Register Form</h1>
        <form className="v-flex mt" onSubmit={handleSubmit}>
          <label className="h-flex">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className="h-flex">
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
        <hr />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setTargetPage("/login"));
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}
