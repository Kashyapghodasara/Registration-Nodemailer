import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Home from "./Components/Home.jsx";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
