import { Link } from "react-router-dom";
import "./login.css"
import { useContext, useRef,useState } from "react";
import { Context } from "../context/context";
import { axiosInstance } from "../config";
export default function Login() {
    const userRef=useRef();
    const passwordRef=useRef();
    const {dispatch,isFetching}=useContext(Context);
    const [error,setError]=useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(false);
        dispatch({type:"LOGIN_START"})
        try{
          const res=await axiosInstance.post("/auth/login",{
            email:userRef.current.value,
            password:passwordRef.current.value,
          })
          dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        }catch(err){
          dispatch({type:"LOGIN_FAILURE"});
          setError(true);
        }
    }
    return (
      <div className="login">
        <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" placeholder="Enter Your Email..." ref={userRef}></input>
        <label>Password</label>
        <input type="password" placeholder="Enter Your Password..." ref={passwordRef}></input>
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
      <Link to="/register" className="Link" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Wrong Credentials or Email Not Verified!!</span>}
    </div>
    )
}