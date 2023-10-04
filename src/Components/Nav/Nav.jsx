import { NavLink } from "react-router-dom";
import NavStyles from "./Nav.module.css";

export const Nav = () => {
  const getActiveLinkStyle = ({ isActive }) => {
    if (isActive) {
      return { color: "#EED91F" };
    }
    return {};
  };
  return (
    <div className={NavStyles.navcontainer}>
      <NavLink to="/" style={getActiveLinkStyle}>
        Explore
      </NavLink>
      <NavLink to="/selected" style={getActiveLinkStyle}>
        Feed
      </NavLink>
      <NavLink to="/bookmarks" style={getActiveLinkStyle}>
        Bookmarks
      </NavLink>
      <NavLink to="/profile" style={getActiveLinkStyle}>
        Profile
      </NavLink>
    </div>
  );
};
