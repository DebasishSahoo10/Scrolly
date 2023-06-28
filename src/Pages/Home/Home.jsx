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
import { handlePostBtn } from "../../Utils/utils";

const Home = () => {
  const navigate = useNavigate();

  const [sortFilter, setSortFilter] = useState("Trending");
  const { state, dispatch } = useContext(DataContext);
  const { auth } = useContext(AuthContext);

  const filteredState = state.posts
  .slice()
  .sort((a, b) => sortFilter === "Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className={HomeStyles.home}>
      <Nav />
      <FilterButton sortState={sortFilter} sortFunc={setSortFilter} />
      <div className={HomeStyles.addButton}>
        <img src={Add} alt="" onClick={() => handlePostBtn(auth, navigate, dispatch)} height={60} width={60}/>
        <img src={Search} alt="" height={60} width={60} className={HomeStyles.searchBtn} onClick={()=>navigate("/search")}/>
      </div>
      <ul className={HomeStyles.postlists}>
        {state.newPostField && <NewPostField className={HomeStyles.newPostField} sortFunc={setSortFilter}/>}
        {filteredState.map((post) => {
          return (
            <li key={post._id}>
              <PostComponent post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
