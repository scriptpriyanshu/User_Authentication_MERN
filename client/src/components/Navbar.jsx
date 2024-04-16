import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  //-------------------
  // fetching user data
  //-------------------

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await fetch("http://localhost:9090/user", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setUserData(data.userData.username);
          }
        } else {
          setUserData("Logo.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [token]);

  // ------------------
  // handle Logout
  // ------------------

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9090/logout");
      if (response.ok) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
        window.location.reload();
      }
      console.log(response, "Button is Clicked");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="flex px-20 py-4 bg-orange-950 text-yellow-400 justify-between">
        <h1 className="text-3xl font-extrabold uppercase">{userData}</h1>
        <ul className="text-xl font-bold flex gap-20">
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? ( // If token exists, show logout button
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            // If token does not exist, show register and login buttons
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
