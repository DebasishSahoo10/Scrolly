import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import LoginStyles from "./Login.module.css";

const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);
  const [login, setLogin] = useState({ username: "", password: "" });
  const handleLogin = () => {
    (async () => {
      try {
        const serverCall = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(login),
        });
        const token = await serverCall.json();
        console.log(token);
        authDispatch({ type: "SET_LOGIN", payload: token.encodedToken });
        userDispatch({ type: "SET_CURRENT_USER", payload: token.foundUser });
        token.foundUser.following.map((user) =>
          userDispatch({ type: "UPDATE_FOLLOWING", payload: user.username })
        );
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
      <h1>Please Login First</h1>
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
      <br />

      <button onClick={() => handleLogin()}>Login</button>
      <button onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
};

export default Login;
