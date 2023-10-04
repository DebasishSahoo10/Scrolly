import { SET_LOGIN, SET_LOGOUT } from "../Redux/AuthSlice";
import { EDIT_FALSE, EDIT_ID, EDIT_POST, EDIT_TRUE, POSTFIELD_FALSE, POSTFIELD_TRUE, SET_BOOKMARKS, SET_POSTS } from "../Redux/DataSlice";
import { SET_CURRENT_USER, UPDATE_ALL_USER, UPDATE_CURRENT_USER, UPDATE_FOLLOWING } from "../Redux/UserSlice";

export const handlePostBtn = (auth, navigate, dispatch) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
  dispatch(POSTFIELD_TRUE());
};
export const handleLogin = (testLogin, dispatch, navigate, setError, login, location) => {
  (async () => {
    try {
      const serverCall = await fetch("/api/auth/login", {
        method: "POST",
        body: testLogin ? JSON.stringify({ username: "thetester_", password: "thetester" }) : JSON.stringify(login),
      });
      const token = await serverCall.json();
      token.encodedToken && dispatch(SET_LOGIN(token.encodedToken));
      token.encodedToken && dispatch(SET_CURRENT_USER(token.foundUser));
      token.encodedToken && token.foundUser.following.map((user) =>
        dispatch(UPDATE_FOLLOWING(user.username))
      );
      token.encodedToken && navigate(location?.state?.from?.pathname)
      token.encodedToken && setError(false)
      !token.encodedToken && setError(true)
    } catch (err) {
      console.error(err);
    }
  })();
};
export const handleLogout = (dispatch) => {
  dispatch(SET_LOGOUT());
  dispatch(SET_CURRENT_USER({}));
};
export const handleProfileEdit = (diaologElement, auth, changedUser, dispatch, setDialogOpen) => {
  (async () => {
    try {
      const serverCall = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: auth },
        body: JSON.stringify(changedUser),
      });
      const newUser = await serverCall.json();
      dispatch(SET_CURRENT_USER(newUser.user));
    } catch (err) {
      console.error(err);
    }
  })();
  setDialogOpen((prev) => ({ ...prev, [diaologElement]: false }));
};
export const handleUpload = (input, toast, state, auth, dispatch, sortFunc) => {
  if(input.postData.content.length===0) {
    // Toast Error here
    toast("A Blank Post. Why ⚠️", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    })
    return;
  }
  if (state.editingPost) {
    const editPostCall = async () => {
      try {
        const serverCall = await fetch("/api/posts/edit/" + state.editingID, {
          method: "POST",
          headers: {
            authorization: auth,
          },
          body: JSON.stringify(input),
        });
        const newPosts = await serverCall.json();
        dispatch(SET_POSTS(newPosts["posts"]));
      } catch (err) {
        console.log(err);
      }
    };
    editPostCall();
    dispatch(EDIT_FALSE());
    dispatch(POSTFIELD_FALSE());
    return;
  }
  (async () => {
    try {
      const serverCall = await fetch("/api/posts", {
        method: "POST",
        headers: {
          authorization: auth,
        },
        body: JSON.stringify(input),
      });
      const newPosts = await serverCall.json();
      dispatch(SET_POSTS(newPosts["posts"]));
    } catch (err) {
      console.error(err);
    }
  })();
  dispatch(POSTFIELD_FALSE());
  sortFunc("Newest")
};
export const handleLike = (likeState, postId, auth, navigate, dispatch) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
  if (likeState > 0) {
    (async () => {
      try {
        const serverCall = await fetch("/api/posts/dislike/" + postId, {
          method: "POST",
          headers: {
            authorization: auth,
          },
        });
        const newPosts = await serverCall.json();
        dispatch(SET_POSTS(newPosts["posts"]));
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
        dispatch(SET_POSTS(newPosts["posts"]));
      } catch (err) {
        console.error(err);
      }
    })();
  }
};
export const handleEdit = (postContent, postID, dispatch, navigate) => {
  dispatch(EDIT_TRUE());
  dispatch(POSTFIELD_TRUE());
  dispatch(EDIT_POST(postContent));
  dispatch(EDIT_ID(postID));
  navigate("/");
};
export const handleDelete = (postID, auth, dispatch) => {
  (async () => {
    try {
      const serverCall = await fetch("/api/posts/" + postID, {
        method: "DELETE",
        headers: {
          authorization: auth,
        },
      });
      const newPosts = await serverCall.json();
      dispatch(SET_POSTS(newPosts["posts"]));
    } catch (err) {
      console.error(err);
    }
  })();
};
export const handleBookmark = (postID, isBookmarked, auth, dispatch, navigate) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
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
      dispatch(SET_BOOKMARKS(bookmarkArray.bookmarks));
    } catch (err) {
      console.error(err);
    }
  })();
};
export const handleFeatureComing = (toast) => {
  toast("This Feature Coming Soon 🔜", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
}
export const handleFollow = (id, auth, navigate, isFollow, dispatch) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
  (async () => {
    try {
      const serverCall = await fetch(
        `/api/users/${isFollow ? "unfollow" : "follow"}/` + id,
        {
          method: "POST",
          headers: {
            authorization: auth,
          },
        }
      );
      const returnedUsersData = await serverCall.json();
      dispatch(UPDATE_ALL_USER(returnedUsersData.followUser));
      dispatch(UPDATE_CURRENT_USER(returnedUsersData.user));
      dispatch(UPDATE_FOLLOWING(returnedUsersData.followUser.username));
    } catch (err) {
      console.error(err);
    }
  })();
};
export const handleCopyLink = (toast) => {
  navigator.clipboard.writeText("https://scrollly.vercel.app/")
  toast("Link Copied to Clipboard ✅", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
}