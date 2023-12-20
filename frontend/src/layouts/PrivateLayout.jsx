import React from "react";
import { Outlet } from "react-router-dom";
// components
import Footer from "../components/Footer";
import PrivateHeader from "../components/PrivateHeader";

export default function PrivateLayout() {
  return (
    <>
      <PrivateHeader />
      <Outlet />
      <Footer />
    </>
  );
}
