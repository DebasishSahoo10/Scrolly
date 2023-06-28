import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { handleLogin, handleLogout } from "../../Utils/utils";
import LoginStyles from "./Login.module.css";


const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState(false)

  return (
    <div className={LoginStyles.login}>
      {auth.length === 0 ? (
        <>
          <h1>{error ? "Wrong Credentials" : "Please Login First" }</h1>

          <label htmlFor="name-input">Name : </label>
          <input type="text" id="name-input" onChange={(e) => setLogin((prev) => ({ ...prev, username: e.target.value }))}/>

          <label htmlFor="password-input">Password : </label>
          <input type="password" id="password-input" onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}/>

          <button onClick={() => handleLogin(false, authDispatch, userDispatch, navigate, setError, login, location)}>Login</button>
          <button onClick={()=>handleLogin(true, authDispatch, userDispatch, navigate, setError, login, location)}>LogIn with Test Credentials</button>
        </>
      ) : (
        <>
          <h1>You can Logout Here</h1>
          <button onClick={() => handleLogout(authDispatch, userDispatch)}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Login;
