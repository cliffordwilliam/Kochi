import React from "react";
import { Outlet } from "react-router-dom";
// components
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <Outlet />
      <Footer />
    </>
  );
}
