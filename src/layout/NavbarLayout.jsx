import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const NavbarLayout = () => {
  return (
    <>
      <div className="main">
        {/* <!-- Navbar --> */}
        <nav className="navbar px-3 navbar-expand-lg justify-content-start border-0 navbar-main align-items-center shadow-sm">
          <NavLink
            to="/"
            className="navbar-brand me-auto align-items-center ms-0 d-flex w-auto"
          >
            <div>
              <img
                className=""
                width="25"
                src="..//assets/images/logo.png"
                alt="avatar"
              />
            </div>
            <div className="ms-0 ms-md-2">
              <h5 className="mb-0 fw-bold title">joinme</h5>
            </div>
          </NavLink>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="login-btn btn d-flex align-items-center"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="initial">
                  <span>F</span>{" "}
                </span>
                <span className="text-capitalize">Fatah Mahama</span>
              </button>
              {/* <!-- <div className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="..//html/login/index.html">Logout</a>
      </div> --> */}
            </div>
          </div>
        </nav>
        {/* <!-- ./ Navbar --> */}

        <Outlet />
      </div>
    </>
  );
};

export default NavbarLayout;
