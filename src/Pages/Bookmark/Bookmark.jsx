import { PostComponent } from "../../Components/PostComponent/PostComponent";
import { Nav } from "../../Components/Nav/Nav";
import HomeStyles from "../Home/Home.module.css";
import { useSelector } from "react-redux";

const Bookmark = () => {
  const data = useSelector(state => state.data);
  const onlyBookmarked = data.posts.filter((post) =>
    data.bookmarks.includes(post._id)
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
export default Bookmark;