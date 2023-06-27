/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { AuthContext } from "../Contexts/AuthContext";
import PostFieldStyles from "./PostField.module.css";
import { UserContext } from "../Contexts/UserContext";
import { useRef } from "react";

export const PostField = ({sortFunc}) => {
  const { state, dispatch } = useContext(DataContext);
  const { userState } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [input, setInput] = useState({ postData: { content: "", img: "" } });
  const inputRef = useRef(null)
  const handleInputClick = () => {
    inputRef.current.click()
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setInput({
      postData: { ...input.postData, img: URL.createObjectURL(file) },
    })
  }
  useEffect(() => {
    if (state.editingPost) {
      setInput({
        postData: { ...input.postData, content: state.editableContent },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const handleUpload = () => {
    if(input.postData.content.length===0) {
      // Toast Error here
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
  return (
    <div className={PostFieldStyles.newField}>
      <img src={userState.currentUser.img} alt="" width={45} height={45} />
      <input
        type="text"
        value={input.postData.content}
        width={200}
        height={100}
        onChange={(e) => setInput({ postData: { content: e.target.value } })}
        placeholder="your post text goes here 📥"
      />
      <div onClick={()=>handleInputClick()} className={PostFieldStyles.imageInput}>
        <button>{input.postData.img ? "Image Selected 📸" : "Select Image 📷"}</button>
        <input type="file" ref={inputRef} style={{display : "none"}} onChange={(e)=>handleFileChange(e)}/>
      </div>
      <button onClick={() => handleUpload()}>Upload ✅</button>
      <button onClick={() => dispatch({ type: "POSTFIELD_FALSE" })}>
        Dismiss 🕯️
      </button>
    </div>
  );
};
