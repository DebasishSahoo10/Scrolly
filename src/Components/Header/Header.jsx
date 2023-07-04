import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import HeaderStyles from "./Header.module.css";

export const Header = () => {
  const { auth } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  return (
    <div className={HeaderStyles.header}>
      <NavLink to="/">
        <h1>SCROLLY</h1>
      </NavLink>
      {auth.length > 0 && (
        <NavLink to="/profile" className={HeaderStyles.smallNav}>
          <div className={HeaderStyles.user}>
            {userState.currentUser.img && (
              <img
                src={userState.currentUser.img}
                alt="profile picture of user"
                width={45}
                height={45}
              />
            )}
            <div>
              <p>{userState.currentUser.username}</p>
              <p>
                {userState.currentUser.firstName}{" "}
                {userState.currentUser.lastName}
              </p>
            </div>
          </div>
        </NavLink>
      )}
      <NavLink to="/login" className={HeaderStyles.loginlink}>
        {auth.length === 0 ? "LogIn" : "LogOut"}
      </NavLink>
      <NavLink
        to="/login"
        className={HeaderStyles.ResLoginlink}
        style={{ display: auth.length > 0 && "none" }}
      >
        LogIn
      </NavLink>
    </div>
  );
};
