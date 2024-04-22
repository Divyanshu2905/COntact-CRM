import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import { axiosInstance } from "../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(false);
    try{
      const res=await axiosInstance.post("/auth/register",{
        name,
        email,
        password
      });
      res.data && window.location.replace("/login");
    }catch(err){
      setError(true);
    }
  }
  return (
    <div className="Register">
        <span className="RegisterTitle">Register</span>
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter Your Username..." onChange={e=>setName(e.target.value)}></input>
        <label>Email</label>
        <input type="email" placeholder="ram@gmail.com" onChange={e=>setEmail(e.target.value)}></input>
        <label>Password</label>
        <input type="password" placeholder="Enter Your Password..." onChange={e=>setPassword(e.target.value)}></input>
        <button className="RegisterButton" type="submit">Register</button>
      </form>
      <span className="RegisterTitl">After Registering Make Sure to Verify Your Email</span>
      <button className="RegisterLoginButton">
      <Link to="/login" className="Link" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Email already in use..!!</span>}
    </div>
  )}
