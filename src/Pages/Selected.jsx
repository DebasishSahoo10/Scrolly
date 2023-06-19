import { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { PostField } from "../Components/PostField";
import { PostComponent } from "../Components/PostComponent";
import { Nav } from "../Components/Nav";
import { FilterButton } from "../Components/FilterButton";

export const Selected = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [sortFilter, setSortFilter] = useState("Trending");
  const { state, dispatch } = useContext(DataContext);
  const { userState } = useContext(UserContext);
  const filteredState = state.posts
    .slice()
    .sort((a, b) =>
      sortFilter === "Trending"
        ? b.likes.likeCount - a.likes.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .filter((post) => userState.followingUsers.includes(post.username));
    console.log(state)
    console.log(userState.currentUser.following)
  const setSort = (text) => {
    setSortFilter(text);
  };

  const handlePostBtn = () => {
    if (auth.length === 0) {
      navigate("/login");
      return;
    }
    dispatch({ type: "POSTFIELD_TRUE" });
  };

  return (
    <>
      <Nav/>
      <FilterButton sortState={sortFilter} sortFunc={setSortFilter}/>
      <div>
        <button onClick={() => handlePostBtn()}>Add a Post</button>
        {state.newPostField && <PostField />}
      </div>
      <ul>
        {filteredState.map((post) => {
          return (
            <li key={post._id} style={{ listStyle: "none" }}>
              <PostComponent post={post} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
