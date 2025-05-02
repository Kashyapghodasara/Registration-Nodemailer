import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [userData, setUserData] = useState({
    name: "",
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

  const registerUser = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post("http://localhost:8080/api/user/register", userData, {
        headers: {
          'Content-Type': 'application/json'  // Ensures data is sent as JSON
        }
      });
      setUserData({
        name: "",
        username: "",
        email: "",
        password: ""
      })
      if(!res.data.success) { 
        toast.error(res.data.message) 
      }
      else { 
        toast.success(res.data.message) 
        Navigate("/login")
      }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3e1436] via-[#612e57] to-[#753369] p-4">
      <div className="bg-[#2b0d24] shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-4xl font-bold text-center text-[#dd95d5]">Create Account</h2>
        <form className="space-y-4" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={changeHandler}
            className="w-full p-3 bg-[#3e1436] border border-[#ad4ca0] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad4ca0]"
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account ? <a href="/login" className="text-[#dd95d5] font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
