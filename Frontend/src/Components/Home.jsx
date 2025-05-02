import React from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Home = () => {

  const Navigate = useNavigate()
  const location = useLocation();
  const user = location.state;

  const logoutUser = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post("http://localhost:8080/api/user/logout", {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.data.success) {
        return toast.error(res.data.message); // Show error before proceeding
      }

      toast.success(res.data.message); // Show success message
      Navigate("/signup"); // Redirect only after successful login

    } catch (error) {
      console.log("Error occurred in Login:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-[#3e1436] via-[#612e57] to-[#753369] p-4 font-mono">
      <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-white/20 w-full max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-[#f4b6ed] drop-shadow-lg transition-all duration-500">
          Welcome,<span className="text-white">{user.username}</span>
        </h1>
        <p className="mt-4 text-center text-[#f8d3ef] text-lg">
          We're glad to have you here.
        </p>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-[#f4b6ed] hover:bg-[#e29edb] text-[#3e1436] cursor-pointer font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>



  )
}

export default Home 