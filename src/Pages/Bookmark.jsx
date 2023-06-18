import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../Contexts/DataContext";
import { PostComponent } from "../Components/PostComponent";

export const Bookmark = () => {
  const { state } = useContext(DataContext);
  const onlyBookmarked = state.posts.filter(post => state.bookmarks.includes(post._id))
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <h2>Yor Bookmark</h2>
      <ul>
        {onlyBookmarked.map(post => {
                return (
                    <PostComponent post={post} key={post._id}/>
                )
            })}
      </ul>
    </>
  );
};
