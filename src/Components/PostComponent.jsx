/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import PostComponentStyles from "./PostComponent.module.css";
import Bookmark from "../assets/Bookmark.png";
import Bookmarked from "../assets/Bookmarked.png";
import Like from "../assets/Like.png";
import Liked from "../assets/Liked.png";
import Remove from "../assets/Remove.png";
import Share from "../assets/Share.png";
import Edit from "../assets/Edit.png";
import Comment from "../assets/Comment.png";

export const PostComponent = ({ post }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DataContext);
  const [isDisliked, setIsDisliked] = useState(false);
  const isBookmarked = state.bookmarks.includes(post._id);
  const { auth } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const likeHandler = (likeState, postId) => {
    if (auth.length === 0) {
      navigate("/login");
      return;
    }
    if (likeState > 0 && !isDisliked) {
      (async () => {
        try {
          const serverCall = await fetch("/api/posts/dislike/" + postId, {
            method: "POST",
            headers: {
              authorization: auth,
            },
          });
          const newPosts = await serverCall.json();
          dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
          setIsDisliked(true);
        } catch (err) {
          console.error(err);
        }
      })();
    } else {
      (async () => {
        try {
          const serverCall = await fetch("/api/posts/like/" + postId, {
            method: "POST",
            headers: {
              authorization: auth,
            },
          });
          const newPosts = await serverCall.json();
          dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
          setIsDisliked(false);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  const handleEdit = (postContent, postID) => {
    dispatch({ type: "EDIT_TRUE" });
    dispatch({ type: "POSTFIELD_TRUE" });
    dispatch({ type: "EDIT_POST", payload: postContent });
    dispatch({ type: "EDIT_ID", payload: postID });
  };
  const handleDelete = (postID) => {
    (async () => {
      try {
        const serverCall = await fetch("/api/posts/" + postID, {
          method: "DELETE",
          headers: {
            authorization: auth,
          },
        });
        const newPosts = await serverCall.json();
        dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
      } catch (err) {
        console.error(err);
      }
    })();
  };
  const handleBookmark = (postID) => {
    (async () => {
      try {
        const serverCall = await fetch(
          `/api/users/${
            isBookmarked ? "remove-bookmark" : "bookmark"
          }/${postID}`,
          {
            method: "POST",
            headers: {
              authorization: auth,
            },
          }
        );
        const bookmarkArray = await serverCall.json();
        dispatch({ type: "SET_BOOKMARKS", payload: bookmarkArray.bookmarks });
      } catch (err) {
        console.error(err);
      }
    })();
  };
  const user = userState.allUsers.find(
    (user) => user.username === post.username
  );
  return (
    <div
      className={
        post.img
          ? PostComponentStyles.imgPost
          : PostComponentStyles.postcontainer
      }
    >
      <div
        className={
          post.img
            ? PostComponentStyles.imgUsernameButton
            : PostComponentStyles.usernameButton
        }
      >
        <div className={PostComponentStyles.username}>
          <img src={user.img} alt="" width={35} height={35} />
          <div>
            <NavLink to={`/user/${post.username}`}>
              <h3>{post.username}</h3>
            </NavLink>
            <p className={PostComponentStyles.smalltext}>30 Min Ago</p>
          </div>
        </div>
        <div className={PostComponentStyles.buttons}>
          <img
            src={post.likes.likeCount === 0 ? Like : Liked}
            alt=""
            onClick={() => likeHandler(post.likes.likeCount, post._id)}
            width={25}
            height={25}
          />

          {post.username === userState.currentUser.username ? (
            <>
              <img
                src={Remove}
                alt=""
                onClick={() => handleDelete(post._id)}
                width={25}
                height={25}
              />
              <img
                src={Edit}
                alt=""
                onClick={() => handleEdit(post.content, post._id)}
                width={21}
                height={21}
              />
            </>
          ) : (
            <>
              <img src={Comment} alt="" width={25} height={25} />
              <img src={Share} alt="" width={25} height={25} />
            </>
          )}
          <img
            onClick={() => handleBookmark(post._id)}
            src={isBookmarked ? Bookmarked : Bookmark}
            alt=""
            width={23}
            height={23}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={PostComponentStyles.content}>
          <p>{post.content}</p>
        </div>
        {post.img && <img src={post.img} alt="" width={380} height={300} />}
      </div>
    </div>
  );
};
