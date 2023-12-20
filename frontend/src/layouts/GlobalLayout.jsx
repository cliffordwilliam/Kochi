import React from "react";
import { Outlet } from "react-router-dom";
// components

export default function GlobalLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
