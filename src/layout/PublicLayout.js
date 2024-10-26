import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {

  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This will render the current route's component */}
      </main>
    </div>
  );
};

export default PublicLayout;
