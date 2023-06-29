/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import PostFieldStyles from "./NewPostField.module.css";
import { handleUpload } from "../../Utils/utils";


export const NewPostField = ({sortFunc}) => {
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
      <button onClick={() => handleUpload(input, toast, state, auth, dispatch, sortFunc)}>Upload ✅</button>
      <button onClick={() => dispatch({ type: "POSTFIELD_FALSE" })}>
        Dismiss 🕯️
      </button>
    </div>
  );
};
