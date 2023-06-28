export const handlePostBtn = (auth, navigate, dispatch) => {
  if (auth.length === 0) {
    navigate("/login");
    return;
  }
  dispatch({ type: "POSTFIELD_TRUE" });
};
