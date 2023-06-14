import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

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
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <NavLink to="/">Home</NavLink>
      <br />
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
    </>
  );
};

export default Login;
