import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { PostComponent } from "../../Components/PostComponent/PostComponent";
import { NewPostField } from "../../Components/NewPostField/NewPostField";
import { Nav } from "../../Components/Nav/Nav";
import { FilterButton } from "../../Components/FilterButton/FilterButton";
import HomeStyles from "./Home.module.css";

import Add from "../../assets/Add.png";
import Search from "../../assets/Search.png"

const Home = () => {
  const [sortFilter, setSortFilter] = useState("Trending");

  const navigate = useNavigate();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = useContext(AuthContext);

  const filteredState = state.posts
    .slice()
    .sort((a, b) =>
      sortFilter === "Trending"
        ? b.likes.likeCount - a.likes.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handlePostBtn = () => {
    if (auth.length === 0) {
      navigate("/login");
      return;
    }
    dispatch({ type: "POSTFIELD_TRUE" });
  };

  return (
    <div className={HomeStyles.home}>
      <Nav />
      <FilterButton sortState={sortFilter} sortFunc={setSortFilter} />
      <div className={HomeStyles.addButton}>
        <img
          src={Add}
          alt=""
          onClick={() => handlePostBtn()}
          height={60}
          width={60}
        />
        <img src={Search} alt="" height={60}
          width={60} className={HomeStyles.searchBtn} onClick={()=>navigate("/search")}/>
      </div>
      <ul className={HomeStyles.postlists}>
        {state.newPostField && <NewPostField className={HomeStyles.newPostField} sortFunc={setSortFilter}/>}
        {filteredState.map((post) => {
          return (
            <li key={post._id} style={{ listStyle: "none" }}>
              <PostComponent post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
