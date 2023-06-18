import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { NavLink } from "react-router-dom";
import HeaderStyles from "./Header.module.css";

export const Header = () => {
  const { auth } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  return (
    <div className={HeaderStyles.header}>
      <h1>SCROLLY</h1>
      {auth.length > 0 && (
        <div className={HeaderStyles.user}>
          <img
            src={userState.currentUser.img}
            alt="profile picture of user"
            width={45}
            height={45}
          />
          <div>
            <p>{userState.currentUser.username}</p>
            <p>
              {userState.currentUser.firstName} {userState.currentUser.lastName}
            </p>
          </div>
        </div>
      )}
      <NavLink to="/login">{auth.length === 0 ? "LogIn" : "LogOut"}</NavLink>
    </div>
  );
};
