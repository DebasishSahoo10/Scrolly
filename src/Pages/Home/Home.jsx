import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { PostComponent } from "../../Components/PostComponent/PostComponent";
import { NewPostField } from "../../Components/NewPostField/NewPostField";
import { Nav } from "../../Components/Nav/Nav";
import { FilterButton } from "../../Components/FilterButton/FilterButton";
import HomeStyles from "./Home.module.css";

import Add from "../../assets/Add.png";
import Search from "../../assets/Search.png";
import { handlePostBtn } from "../../Utils/utils";

const Home = () => {
  const navigate = useNavigate();
  const [itemLimit, setItemLimit] = useState(3);
  const [isWait, setIsWait] = useState(false);
  const [sortFilter, setSortFilter] = useState("Trending");
  const { state, dispatch } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  const lastItemRef = useRef();
  const filteredState = state.posts
    .slice()
    .sort((a, b) =>
      sortFilter === "Trending"
        ? b.likes.likeCount - a.likes.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const limitedArray = filteredState.filter((fruit, i) => i <= itemLimit);

  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && itemLimit <= filteredState.length) {
          setIsWait(true);
          setTimeout(() => {
            setItemLimit((prev) => prev + 3);
            setIsWait(false);
          }, 2000);
        }
      });
      observer.observe(lastItemRef.current);
      return () => {
        observer.disconnect();
      };
    }, 500);
  }, [itemLimit, filteredState.length]);

  return (
    <div className={HomeStyles.home} style={{minHeight : `${filteredState.length * 400}px`}}>
      <Nav />
      <FilterButton sortState={sortFilter} sortFunc={setSortFilter} />
      <div className={HomeStyles.addButton}>
        <img
          src={Add}
          alt=""
          onClick={() => handlePostBtn(auth, navigate, dispatch)}
          height={60}
          width={60}
        />
        <img
          src={Search}
          alt=""
          height={60}
          width={60}
          className={HomeStyles.searchBtn}
          onClick={() => navigate("/search")}
        />
      </div>
      <ul className={HomeStyles.postlists}>
        {state.newPostField && (
          <NewPostField
            className={HomeStyles.newPostField}
            sortFunc={setSortFilter}
          />
        )}
        {limitedArray.map((post, i) => {
          return (
            <li key={post._id}>
              <PostComponent
                post={post}
                ref={i === limitedArray.length - 1 ? lastItemRef : null}
              />
            </li>
          );
        })}
        {isWait ? <h2 style={{paddingBottom : "20px"}}>More Posts are Loading..</h2> : <h2 style={{paddingBottom : "20px"}}>That is all we got</h2>}
      </ul>
    </div>
  );
};

export default Home;
