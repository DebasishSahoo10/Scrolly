import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleLogin, handleLogout } from "../../Utils/utils";
import LoginStyles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth.auth);
  
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState(false)
  const [passwordFieldType, setPasswordFieldType] = useState("password")

  return (
    <div className={LoginStyles.login}>
      {auth.length === 0 ? (
        <>
          <h1>{error ? "Wrong Credentials" : "Please Login First" }</h1>

          <label htmlFor="name-input">Username : </label>
          <input type="text" id="name-input" onChange={(e) => setLogin((prev) => ({ ...prev, username: e.target.value }))}/>

          <label htmlFor="password-input">Password : </label>
          <input type={passwordFieldType ? "password" : "text"} id="password-input" onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}/>
          <p onClick={()=>setPasswordFieldType(prev => !prev)} style={{cursor : "pointer", fontSize : "larger"}}>{passwordFieldType ? "😑" : "😐"}</p>

          <button onClick={() => handleLogin(false, dispatch, navigate, setError, login, location)}>Login</button>
          <button onClick={()=>handleLogin(true, dispatch, navigate, setError, login, location)}>LogIn with Test Credentials</button>

          <p>Not have an account? You can <NavLink to="/signup">Signup</NavLink> here</p>
        </>
      ) : (
        <>
          <h1>You can Logout Here</h1>
          <button onClick={() => handleLogout(dispatch)}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Login;
