import React, { useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { setTargetPage } from "../store/curtainSlice";
import { setContent } from "../store/modalSlice";

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
      dispatch(setContent({ content: "Loading or no data", isOn: false }));
      // Save token to mem
      console.log(data);
      localStorage.setItem("token", data.token);
      dispatch(setTargetPage("/"));
      // go to home
      // navigate("/");
    } else {
      dispatch(
        setContent({ content: data.response.data.error.msg, isOn: true })
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setContent({ content: "Loading or no data", isOn: true }));
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
    <main className="cc">
      <div className="v-flex panel">
        <h1 className="t">Login Form</h1>
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
            dispatch(setTargetPage("/register"));
          }}
        >
          Register
        </button>
      </div>
    </main>
  );
}
