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