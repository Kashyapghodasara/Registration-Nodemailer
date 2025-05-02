import DBconnect from "../config/DBConnection.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

DBconnect();

export const userRegister = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password)
            return res.status(404).json({
                message: "All fields are require",
                success: false
            })

        const userFind = await User.findOne({ email, username });
        if (userFind)
            return res.status(401).json({
                message: "User Already Exist",
                success: false
            })

        const hashPassword = await bcrypt.hash(password, 16)
        const newUser = await User.create({
            name,
            username,
            email,
            password: hashPassword
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,   // Bydefault port for Gmail
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.LESS_SECURE_EMAIL,
                pass: process.env.LESS_SECURE_PW,
            },
        })

        const message = {
            from: process.env.LESS_SECURE_EMAIL,
            to: email,
            subject: "Registration Success",
            text: `Welcome ${username} to our platform, we are glad to have you here.`
        }
        
        transporter.sendMail(message, (err, info) => {
            if(err) {
                console.log("Error occured in sending email", err)
            } else {
                console.log("Email sent successfully", info)
            }
            res.end()
        })

        res.status(201).json({
            message: "User Created Successfully",
            success: "true"
        })
    } catch (error) {
        console.log("Error Generate in Registration", error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(401).json({
                message: "ALl fields are required",
                success: true
            })

        const findUser = await User.findOne({ email, username })
        if (!findUser)
            return res.status(401).json({
                message: "User Not Found",
                success: false
            })

        const isMatch = bcrypt.compare(password, findUser.password)
        if (!isMatch)
            return res.status(401).json({
                message: "Incorrect Password",
                success: false
            })

        const tokenData = {
            id: findUser._id
        }

        // This is Specially For sending User to Frontend without Password
        const sendingUser = await User.findOne({ email, username }).select("-password")

        const Token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,   // Bydefault port for Gmail
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.LESS_SECURE_EMAIL,
                pass: process.env.LESS_SECURE_PW,
            },
        })
        const loginTime = new Date().toLocaleString();
        const message = {
            from: process.env.LESS_SECURE_EMAIL,
            to: email,
            subject: "Login Success",
            text: `Hello ${username} 👋,

            We're happy to see you back on our platform! You successfully logged in on:
            
            🕒 ${loginTime}
            
            We hope you have a great experience ahead. If you have any questions or need help, feel free to reach out anytime.
            
            Cheers 🤝,  
            The Team`
        }
        
        transporter.sendMail(message, (err, info) => {
            if(err) {
                console.log("Error occured in sending email", err)
            } else {
                console.log("Email sent successfully", info)
            }
            res.end()
        })

        return res.cookie("token", Token, { expiresIn: "1d", httpOnly: true }).status(200).json({
            message: "Login Successfully",
            success: true,
            sendingUser
        })
    } catch (error) {
        console.log("Error Generate in Login", error)
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", { expiresIn: Date.now(), httpOnly: true }).status(200).json({
            message: "User Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log("Error Occure in Logout Process", error)
    }
}