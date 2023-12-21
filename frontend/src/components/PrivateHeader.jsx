import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setTargetPage } from "../store/curtainSlice";
import { useDispatch } from "react-redux";

export default function PrivateHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header>
      <div className="h-flex">
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setTargetPage("/tetris"));
          }}
        >
          Tetris
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setTargetPage("/"));
          }}
        >
          Home
        </button>

        {/* <Link to={"/tetris"}>
          <button>Tetris</button>
        </Link> */}
        {/* <Link to={"/"}>
          <button>Home</button>
        </Link> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            dispatch(setTargetPage("/login"));
          }}
        >
          Logout
        </button>
      </div>
      <h1>MAIN MENU</h1>
    </header>
  );
}
