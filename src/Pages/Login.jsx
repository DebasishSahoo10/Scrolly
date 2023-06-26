import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import LoginStyles from "./Login.module.css";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState(false)
  const handleLogin = (testLogin) => {
    (async () => {
      try {
        const serverCall = await fetch("/api/auth/login", {
          method: "POST",
          body: testLogin ? JSON.stringify({ username: "thetester_", password: "thetester" }) : JSON.stringify(login),
        });
        const token = await serverCall.json();
        console.log(token);
        token.encodedToken && authDispatch({ type: "SET_LOGIN", payload: token.encodedToken });
        token.encodedToken && userDispatch({ type: "SET_CURRENT_USER", payload: token.foundUser });
        token.encodedToken && token.foundUser.following.map((user) =>
          userDispatch({ type: "UPDATE_FOLLOWING", payload: user.username })
        );
        token.encodedToken && navigate(location.state.from.pathname)
        token.encodedToken && setError(false)
        !token.encodedToken && setError(true)
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const handleLogout = () => {
    authDispatch({ type: "SET_LOGOUT" });
    userDispatch({ type: "SET_CURRENT_USER", payload: {} });
  };

  return (
    <div className={LoginStyles.login}>
      {auth.length === 0 ? (
        <>
          <h1>{error ? "Wrong Credentials" : "Please Login First" }</h1>
          <label htmlFor="name-input">Name : </label>
          <input
            type="text"
            id="name-input"
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <br />
          <label htmlFor="password-input">Password : </label>
          <input
            type="password"
            id="password-input"
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button onClick={() => handleLogin(false)}>Login</button>
          <button onClick={()=>handleLogin(true)}>LogIn with Test Credentials</button>
        </>
      ) : (
        <>
          <h1>You can Logout Here</h1>
          <button onClick={() => handleLogout()}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Login;
