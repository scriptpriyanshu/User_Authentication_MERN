import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("Register.jsx", data.token);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success(data.msg);
        setUser({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center h-[89.2vh] bg-yellow-400 justify-center flex-col">
      <h1 className="text-4xl text-orange-950 font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex mt-10 flex-col gap-3">
        <div>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            className="px-5 placeholder-[#b35547] py-2 border-2 border-[#892414] rounded-lg text-[#892414] outline-none font-medium"
            placeholder="Username"
            required
            value={user.username}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            className="px-5 placeholder-[#b35547] py-2 border-2 border-[#892414] rounded-lg text-[#892414] outline-none font-medium"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            type="text"
            className="px-5 placeholder-[#b35547] py-2 border-2 border-[#892414] rounded-lg text-[#892414] outline-none font-medium"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleInput}
          />
        </div>
        <button
          className="btn font-bold text-2xl py-2 rounded-lg bg-orange-950 text-yellow-400"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
