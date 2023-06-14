import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { AuthContext } from "../Contexts/AuthContext";

export const PostField = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  const [input, setInput] = useState({ postData: { content: "" } });
  useEffect(() => {
    if (state.editingPost) {
      setInput({ postData: { content: state.editableContent } });
    }
  }, [state]);
  const handleUpload = () => {
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
          console.log(newPosts);
          dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
        } catch (err) {
          console.log(err);
        }
      };
      editPostCall();
      dispatch({type : "EDIT_FALSE"})
      dispatch({type : "POSTFIELD_FALSE"})
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
        console.log(newPosts);
        dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
      } catch (err) {
        console.error(err);
      }
    })();
    dispatch({ type: "POSTFIELD_FALSE" });
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={input.postData.content}
          width={200}
          height={100}
          onChange={(e) => setInput({ postData: { content: e.target.value } })}
        />
        <button onClick={() => handleUpload()}>Upload</button>
      </div>
    </>
  );
};
