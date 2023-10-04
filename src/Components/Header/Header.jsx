import { NavLink } from "react-router-dom";
import HeaderStyles from "./Header.module.css";
import { useSelector } from "react-redux";

export const Header = () => { 
  const auth = useSelector(state => state.auth.auth);
  const user = useSelector(state => state.user)
  return (
    <div className={HeaderStyles.header}>
      <NavLink to="/">
        <h1>SCROLLY</h1>
      </NavLink>
      {auth.length > 0 && (
        <NavLink to="/profile" className={HeaderStyles.smallNav}>
          <div className={HeaderStyles.user}>
            {user.currentUser.img && (
              <img
                src={user.currentUser.img}
                alt="profile picture of user"
                width={45}
                height={45}
              />
            )}
            <div>
              <p>{user.currentUser.username}</p>
              <p>
                {user.currentUser.firstName}{" "}
                {user.currentUser.lastName}
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
