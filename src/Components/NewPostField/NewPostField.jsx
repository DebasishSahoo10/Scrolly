/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostFieldStyles from "./NewPostField.module.css";
import { handleUpload } from "../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { POSTFIELD_FALSE } from "../../Redux/DataSlice";


export const NewPostField = ({sortFunc}) => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth.auth);
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
    if (data.editingPost) {
      setInput({
        postData: { ...input.postData, content: data.editableContent },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
 
  return (
    <div className={PostFieldStyles.newField}>
      <img src={user.currentUser.img} alt="" width={45} height={45} />
      <input
        type="text"
        value={input.postData.content}
        width={200}
        height={100}
        onChange={(e) => setInput({ postData: { ...input.postData, content: e.target.value } })}
        placeholder="your post text goes here 📥"
      />
      <div onClick={()=>handleInputClick()} className={PostFieldStyles.imageInput}>
        <button>{input.postData.img ? "Image Selected 📸" : "Select Image 📷"}</button>
        <input type="file" ref={inputRef} style={{display : "none"}} onChange={(e)=>handleFileChange(e)}/>
      </div>
      <button onClick={() => handleUpload(input, toast, data, auth, dispatch, sortFunc)}>Upload ✅</button>
      <button onClick={() => dispatch(POSTFIELD_FALSE())}>
        Dismiss 🕯️
      </button>
    </div>
  );
};
