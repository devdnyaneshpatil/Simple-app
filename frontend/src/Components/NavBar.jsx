import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="./logo.jfif"
            alt="User Dashboard Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <h3 className="mb-0">User Dashboard</h3>
        </a>

        <div className="ml-auto d-flex align-items-center">
          <div
            onClick={handleToggle}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <img
              src="./avatar.png"
              alt="User Avatar"
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
            {show && (
              <div
                className="dropdown-menu show"
                style={{ position: "absolute", top: "100%", right: 0 }}
              >
                <a
                  className="dropdown-item dropdown-item-custom"
                  href="#/profile"
                >
                  Profile
                </a>
                <a
                  className="dropdown-item dropdown-item-custom"
                  href="#/logout"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
