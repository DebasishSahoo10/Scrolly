import { useContext } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";


import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";

import Home from "../../assets/Responsive Assets/Home.svg";
import Bookmark from "../../assets/Responsive Assets/Bookmark.svg";
import Explore from "../../assets/Responsive Assets/Explore.svg";
import Add from "../../assets/Responsive Assets/Add.svg";
import Search from "../../assets/Responsive Assets/Search.svg";
import NavStyles from "./ResponsiveNav.module.css";


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
    navigate("/")
  };
  const getACtiveStyle = ({isActive}) => {
    if (isActive) {
     return {borderBottom : "1px solid white"}
    }
    return {}
  }
  return (
    <div className={NavStyles.ResNavButtons}>
      <NavLink to="/" style={getACtiveStyle}><img src={Home} alt="" width={50} height={50}/></NavLink>
      <NavLink to="/bookmarks" style={getACtiveStyle}><img src={Bookmark} alt="" width={50} height={50}/></NavLink>
      <img src={Add} alt="" onClick={()=>handlePostBtn()} width={50} height={50}/>
      <NavLink to="/selected" style={getACtiveStyle}><img src={Explore} alt="" width={50} height={50}/></NavLink>
      <NavLink to="/search" style={getACtiveStyle}><img src={Search} alt="" width={50} height={50}/></NavLink>
    </div>
  );
};
