import Home from "../assets/Responsive Assets/Home.png";
import Bookmark from "../assets/Responsive Assets/Bookmark.png";
import Explore from "../assets/Responsive Assets/Explore.png";
import Add from "../assets/Responsive Assets/Add.png";
import Search from "../assets/Responsive Assets/Search.png";
import NavStyles from "./ResponsiveNav.module.css";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export const ResponsiveNav = () => {
    const {dispatch} = useContext(DataContext)
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()

    const handlePostBtn = () => {
        if (auth.length === 0) {
          navigate("/login");
          return;
        }
        dispatch({ type: "POSTFIELD_TRUE" });
      };
  return (
    <div className={NavStyles.ResNavButtons}>
      <NavLink to="/"><img src={Home} alt="" /></NavLink>
      <NavLink to="/bookmarks"><img src={Bookmark} alt="" /></NavLink>
      <img src={Add} alt="" onClick={()=>handlePostBtn()}/>
      <NavLink to="/selected"><img src={Explore} alt="" /></NavLink>
      <NavLink to="/search"><img src={Search} alt="" /></NavLink>
    </div>
  );
};
