import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { userLogout } from "../../redux/actions/userActions";
import { useEffect } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const Logout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {}, [userInfo]);
  return (
    <div className="Navbar" style={{ color: "#fca61f" }}>
      <div className="navLeft">
        <span className="nav-logo" style={{ width: "1rem" }}>
          <Link to={"/"} className="nav-link">
            SHOPPYME
          </Link>
        </span>
      </div>

      <div className="navRight">
        <div className="links" id={open ? "hidden" : ""}>
          {userInfo ? (
            <>
              <div className="ui compact menu">
                <Link to={"/cart"} className="item nav-link cart">
                  <span>
                    cart <i className="icon shopping cart"></i>
                  </span>

                  {cartItems.length > 0 && (
                    <div className="floating ui yellow label">
                      {cartItems.length}
                    </div>
                  )}
                </Link>
              </div>

              <div className="dropdown">
                <Link to="#" className="nav-link">
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#fca61f",
                      textTransform: "capitalize",
                    }}
                  >
                    Hi,{userInfo.name}
                    <i className="dropdown icon"></i>
                  </span>
                </Link>
                <ul className="dropdown-content">
                  <li className="navbar-list">
                    <Link to={"/profile"} className="nav-link">
                      <span>My Profile</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to={"/orderhistory"} className="nav-link">
                      <span>My Orders</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to="#logout" onClick={Logout} className="nav-link">
                      <span>Log Out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to={"/login"} className="nav-link">
                  <span style={{ fontWeight: "bold", color: "#fca61f" }}>
                    Login
                  </span>{" "}
                </Link>
              </div>

              <div>
                <Link to={"/Register"} className="nav-link">
                  <span style={{ fontWeight: "bold", color: "#fca61f" }}>
                    Register
                  </span>{" "}
                </Link>
              </div>
            </>
          )}

          {userInfo && userInfo.isAdmin && (
            <>
              <div className="dropdown">
                <Link to="#" className="nav-link">
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#fca61f",
                      textTransform: "capitalize",
                    }}
                  >
                    Admin
                    <i className="dropdown icon"></i>
                  </span>
                </Link>
                <ul className="dropdown-content">
                  <li className="navbar-list">
                    <Link to={"/dashboard"} className="nav-link">
                      <span>Dashboard</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to={"/admin-products"} className="nav-link">
                      <span>Products</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to={"/admin-addproducts"} className="nav-link">
                      <span>Add products</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to={"/orders"} className="nav-link">
                      <span>Total Orders</span>
                    </Link>
                  </li>

                  <li className="navbar-list">
                    <Link to={"/users"} className="nav-link">
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="toggle">
          {open ? (
            <i className="fa fa-times" onClick={() => setOpen(!open)}></i>
          ) : (
            <i className="fa fa-bars" onClick={() => setOpen(!open)}></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
