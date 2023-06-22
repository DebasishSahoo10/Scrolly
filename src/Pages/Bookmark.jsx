import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import { PostComponent } from "../Components/PostComponent";
import { Nav } from "../Components/Nav";
import HomeStyles from "./Home.module.css";

export const Bookmark = () => {
  const { state } = useContext(DataContext);
  const onlyBookmarked = state.posts.filter((post) =>
    state.bookmarks.includes(post._id)
  );
  return (
    <div className={HomeStyles.home}>
      <Nav />
      <ul className={HomeStyles.postlists}>
        {onlyBookmarked.length === 0 && (
          <h2>Oops : You have not Bookmarked any Post</h2>
        )}
        {onlyBookmarked.map((post) => {
          return <PostComponent post={post} key={post._id} />;
        })}
      </ul>
    </div>
  );
};
