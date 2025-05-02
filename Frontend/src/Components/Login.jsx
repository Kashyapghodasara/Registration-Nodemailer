import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"

const Login = () => {

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const Navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {  // Ensure returning the updated object
        ...prev,
        [name]: value
      };
    });
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();
  
      const res = await axios.post("http://localhost:8080/api/user/login", userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // ✅ Include this if you're using cookies
      });
  
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
  
      toast.success(res.data.message);
      setUserData({
        username: "",
        email: "",
        password: ""
      });
  
      const sendingUser = res.data.sendingUser; // ✅ Extract user from response
  
      Navigate("/home", { state: sendingUser }); // ✅ Correct usage
  
    } catch (error) {
      console.log("Error occurred in Login:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#3e1436] via-[#612e57] to-[#753369] p-4">
      <div className="bg-[#2b0d24] shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-4xl font-bold text-center text-[#dd95d5]">Welcome Back</h2>

        <form className="space-y-4" onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={changeHandler}
            className="w-full p-3 bg-[#3e1436] border border-[#ad4ca0] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad4ca0]"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeHandler}
            className="w-full p-3 bg-[#3e1436] border border-[#ad4ca0] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad4ca0]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeHandler}
            className="w-full p-3 bg-[#3e1436] border border-[#ad4ca0] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad4ca0]"
          />
          <button
            type="submit"
            className="w-full bg-[#ad4ca0] hover:bg-[#964088] text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don't have an account? <a href="/signup" className="text-[#dd95d5] font-semibold">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
