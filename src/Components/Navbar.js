import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";


const Navbar = () => {
  const { isLogin, logout } = useContext(LoginContext);
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
          <div className="container-fluid ">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              
                {isLogin && (
               <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/list"
                      >
                        Product List
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/category"
                      >
                        Category Add
                      </NavLink>
                    </li>
                    </ul>
                )}
            

              <div className="d-flex">
                {isLogin && (
                  <div className="d-flex align-items-center">
                    <div>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={logout}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
