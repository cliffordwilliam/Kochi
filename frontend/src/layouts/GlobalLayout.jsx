import React from "react";
import { Outlet } from "react-router-dom";
// components
import Background from "../components/Background";
import Textures from "../components/Textures";
import Curtain from "../components/Curtain";
import Modal from "../components/Modal";

export default function GlobalLayout() {
  return (
    <>
      <Curtain />
      <Textures />
      <Background />
      <Modal />
      <Outlet />
    </>
  );
}
