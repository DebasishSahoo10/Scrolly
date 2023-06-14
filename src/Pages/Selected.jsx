import { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { UserContext } from "../Contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { PostField } from "../Components/PostField";
import { PostComponent } from "../Components/PostComponent";

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
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login" style={{ marginLeft: "10px" }}>
          Login
        </NavLink>
      </div>
      <div>
        <button
          value={"Trending"}
          style={{ color: sortFilter === "Trending" && "Yellow" }}
          onClick={(e) => setSort(e.target.value)}
        >
          Trending
        </button>

        <button
          value={"Newest"}
          style={{ color: sortFilter === "Newest" && "Yellow" }}
          onClick={(e) => setSort(e.target.value)}
        >
          Newest
        </button>
      </div>
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
