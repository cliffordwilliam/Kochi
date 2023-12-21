import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTargetPage } from "../store/curtainSlice";

export default function Curtain() {
  const navigate = useNavigate();
  const { targetPage } = useSelector((state) => state.curtain);
  useEffect(() => {
    if (targetPage) {
      setTimeout(() => {
        navigate(targetPage);
        dispatch(setTargetPage(""));
      }, 500);
    }
  }, [targetPage]);
  const dispatch = useDispatch();
  return <div className={`curtain ${targetPage ? "fade-in" : ""}`}></div>;
}
