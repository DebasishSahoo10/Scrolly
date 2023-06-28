import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { UserContext } from "../../Contexts/UserContext";
import { PostComponent } from "../../Components/PostComponent/PostComponent";
import { FilterButton } from "../../Components/FilterButton/FilterButton";
import { Nav } from "../../Components/Nav/Nav";
import HomeStyles from "../Home/Home.module.css"

export const Feed = () => {
  const { state } = useContext(DataContext);
  const { userState } = useContext(UserContext);
  
  const [sortFilter, setSortFilter] = useState("Trending");

  const filteredState = state.posts
  .slice()
  .sort((a, b) => sortFilter === "Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .filter((post) => userState.followingUsers.includes(post.username));

  return (
    <div className={HomeStyles.home}>
      <Nav />
      {filteredState.length > 0 && <FilterButton sortState={sortFilter} sortFunc={setSortFilter} />}
      {filteredState.length > 0 
      ? <ul className={HomeStyles.postlists}>
         {filteredState.map((post) => {
           return (
             <li key={post._id} style={{ listStyle: "none" }}>
              <PostComponent post={post} />
             </li>
           );
         })}
        </ul> 
      : <h2>Follow Someone First 😶‍🌫️</h2>}
    </div>
  );
};
