import React from "react";
import NavBar from "../Components/NavBar";
import User from "../Components/User";

function HomePage() {
  const token = JSON.parse(localStorage.getItem("token"))
  
  return (
    <>
      <NavBar />
      <User token={ token} />
    </>
  );
}

export default HomePage;
