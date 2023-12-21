import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../store/modalSlice";

export default function Modal() {
  const { content, isOn } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <div className={`cc modal ${isOn ? "fade-in" : ""}`}>
      <div className="v-flex panel">
        <h2 className="t">Modal</h2>
        <p>{content}</p>
        {content !== "Loading or no data" ? (
          <button
            onClick={() => dispatch(setContent({ content, isOn: false }))}
          >
            Close
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
