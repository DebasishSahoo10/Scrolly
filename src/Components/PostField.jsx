import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { AuthContext } from "../Contexts/AuthContext";
import PostFieldStyles from "./PostField.module.css";
import {UserContext} from "../Contexts/UserContext"

export const PostField = () => {
  const { state, dispatch } = useContext(DataContext);
  const {userState} = useContext(UserContext)
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
        console.log(newPosts);
        dispatch({ type: "SET_POSTS", payload: newPosts["posts"] });
      } catch (err) {
        console.error(err);
      }
    })();
    dispatch({ type: "POSTFIELD_FALSE" });
  };
  return (
    <div className={PostFieldStyles.newField}>
      <img src={userState.currentUser.img} alt="" width={45} height={45}/>
      <input
        type="text"
        value={input.postData.content}
        width={200}
        height={100}
        onChange={(e) => setInput({ postData: { content: e.target.value } })}
        placeholder="your post text goes here 📥"
      />
      <button>Select Image 📸</button>
      <button onClick={() => handleUpload()}>Upload ✅</button>
      <button onClick={()=> dispatch({ type: "POSTFIELD_FALSE" })}>Dismiss 🕯️</button>
    </div>
  );
};
