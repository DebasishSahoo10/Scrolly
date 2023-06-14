/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export const PostComponent = ({ post }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DataContext);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { auth } = useContext(AuthContext);
  const {userState} = useContext(UserContext)
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
          console.log(newPosts["posts"]);
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
          console.log(newPosts["posts"]);
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
    (async()=>{
      try {
        const serverCall = await fetch(`/api/users/${isBookmarked ? 'remove-bookmark' : 'bookmark'}/${postID}`, {
          method : "POST",
          headers : {
            authorization : auth
          }
        })
        setIsBookmarked(prev => !prev)
        const bookmarkArray = await serverCall.json()
        console.log(bookmarkArray)
      } catch (err) {
        console.error(err)
      }
    })()
  }
  return (
    <div
      style={{
        border: "2px solid yellow",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <NavLink to={`/user/${post.username}`}><h3>{post.username}</h3></NavLink>
      <p>{post.content}</p>
      {post.username === userState.currentUser.username && (
        <div>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
          <button onClick={() => handleEdit(post.content, post._id)}>
            Edit
          </button>
        </div>
      )}
      <div>
        {post.likes.likeCount !== 0 && (
          <button
            onClick={() => likeHandler(post.likes.likeCount, post._id)}
            style={{ color: "Red" }}
          >
            Liked - {post.likes.likeCount}
          </button>
        )}
        {post.likes.likeCount === 0 && (
          <button onClick={() => likeHandler(post.likes.likeCount, post._id)}>
            Like
          </button>
        )}
        <button onClick={()=>handleBookmark(post._id)}>{isBookmarked ? "Remove Bookmark" : "Bookmark"}</button>
      </div>
    </div>
  );
};
