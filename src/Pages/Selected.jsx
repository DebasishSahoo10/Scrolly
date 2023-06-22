import { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { UserContext } from "../Contexts/UserContext";
import { PostComponent } from "../Components/PostComponent";
import { Nav } from "../Components/Nav";
import { FilterButton } from "../Components/FilterButton";
// import SelectedStyles from "./Selected.module.css";
import HomeStyles from "./Home.module.css"

export const Selected = () => {

  const [sortFilter, setSortFilter] = useState("Trending");
  const { state } = useContext(DataContext);
  const { userState } = useContext(UserContext);
  const filteredState = state.posts
    .slice()
    .sort((a, b) =>
      sortFilter === "Trending"
        ? b.likes.likeCount - a.likes.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .filter((post) => userState.followingUsers.includes(post.username));

  return (
    <div className={HomeStyles.home}>
      <Nav />
      <FilterButton sortState={sortFilter} sortFunc={setSortFilter} />
      <ul className={HomeStyles.postlists}>
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
