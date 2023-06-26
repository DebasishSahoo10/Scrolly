import Home from "../assets/Responsive Assets/Home.png";
import Bookmark from "../assets/Responsive Assets/Bookmark.png";
import Explore from "../assets/Responsive Assets/Explore.png";
import Add from "../assets/Responsive Assets/Add.png";
import Search from "../assets/Responsive Assets/Search.png";
import NavStyles from "./ResponsiveNav.module.css";

export const ResponsiveNav = () => {
  return (
    <div className={NavStyles.ResNavButtons}>
      <img src={Home} alt="" />
      <img src={Bookmark} alt="" />
      <img src={Add} alt="" />
      <img src={Explore} alt="" />
      <img src={Search} alt="" />
    </div>
  );
};
