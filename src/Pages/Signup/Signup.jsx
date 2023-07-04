import { useState } from "react";
import LoginStyles from "../Login/Login.module.css";

const Signup = () => {
    const [signupError, setSignupError] = useState(false)
    const [canLogin, setCanLogin] = useState(false)
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    password: "",
  });
  const handleSignup = () => {
    (async () => {
        try {
            const serverCall = await fetch("/api/auth/signup", {
                method : "POST",
                body : JSON.stringify(signupDetails)
            })
            const serverResponse = await serverCall.json()
            console.log(serverResponse)
            {!serverResponse.encodedToken && setSignupError(true)}
            {!serverResponse.encodedToken && setCanLogin(false)}
            {serverResponse.encodedToken && setCanLogin(true)}
            {serverResponse.encodedToken && setSignupError(false)}
        } catch (err) {
            console.error(err)
        }
    })()
  }
  return (
    <div className={LoginStyles.login}>
      <>
        <h1>{signupError ? "Username Already Exists" : `${canLogin ?  "You can Login now" : "Your Signup Page 👇"}`}</h1>
        <label htmlFor="username-signup">Username</label>
        <input type="text" id="username-signup" onChange={(e)=>setSignupDetails(prev => ({...prev, username : e.target.value}))}/>

        <label htmlFor="password-signup">Password</label>
        <input type="password" id="password-signup" onChange={(e)=>setSignupDetails(prev => ({...prev, password : e.target.value}))}/>

        <button onClick={()=>handleSignup()}>Create Account</button>
      </>
    </div>
  );
};

export default Signup;
