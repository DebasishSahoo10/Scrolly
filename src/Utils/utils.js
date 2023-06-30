export const handlePostBtn = (auth, navigate, dispatch) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
  dispatch({ type: "POSTFIELD_TRUE" });
};
export const handleLogin = (testLogin, authDispatch, userDispatch, navigate, setError, login, location) => {
  (async () => {
    try {
      const serverCall = await fetch("/api/auth/login", {
        method: "POST",
        body: testLogin ? JSON.stringify({ username: "thetester_", password: "thetester" }) : JSON.stringify(login),
      });
      const token = await serverCall.json();
      token.encodedToken && authDispatch({ type: "SET_LOGIN", payload: token.encodedToken });
      token.encodedToken && userDispatch({ type: "SET_CURRENT_USER", payload: token.foundUser });
      token.encodedToken && token.foundUser.following.map((user) =>
        userDispatch({ type: "UPDATE_FOLLOWING", payload: user.username })
      );
      token.encodedToken && navigate(location?.state?.from?.pathname)
      token.encodedToken && setError(false)
      !token.encodedToken && setError(true)
    } catch (err) {
      console.error(err);
    }
  })();
};
export const handleLogout = (authDispatch, userDispatch) => {
  authDispatch({ type: "SET_LOGOUT" });
  userDispatch({ type: "SET_CURRENT_USER", payload: {} });
};
export const handleProfileEdit = (diaologElement, auth, changedUser, userDispatch, setDialogOpen) => {
  (async () => {
    try {
      const serverCall = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: auth },
        body: JSON.stringify(changedUser),
      });
      const newUser = await serverCall.json();
      userDispatch({ type: "SET_CURRENT_USER", payload: newUser.user });
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
        dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
      } catch (err) {
        console.log(err);
      }
    };
    editPostCall();
    dispatch({ type: "EDIT_FALSE" });
    dispatch({ type: "POSTFIELD_FALSE" });
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
      dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
    } catch (err) {
      console.error(err);
    }
  })();
  dispatch({ type: "POSTFIELD_FALSE" });
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
        dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
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
      } catch (err) {
        console.error(err);
      }
    })();
  }
};