/* eslint-disable react/prop-types */
import { useContext, forwardRef} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataContext } from "../../Contexts/DataContext";
import { UserContext } from "../../Contexts/UserContext";
import Bookmark from "../../assets/Bookmark.png";
import Bookmarked from "../../assets/Bookmarked.png";
import Like from "../../assets/Like.png";
import Liked from "../../assets/Liked.png";
import Remove from "../../assets/Remove.png";
import Share from "../../assets/Share.png";
import Edit from "../../assets/Edit.png";
import Comment from "../../assets/Comment.png";
import PostComponentStyles from "./PostComponent.module.css";
import { handleBookmark, handleDelete, handleEdit, handleFeatureComing, handleLike } from "../../Utils/utils";


export const PostComponent = forwardRef(({post} , ref) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DataContext);
  const isBookmarked = state.bookmarks.includes(post._id);
  const { auth } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const user = userState.allUsers.find(
    (user) => user.username === post.username
  );

  return (
    <div className={post.img ? PostComponentStyles.imgPost : PostComponentStyles.postcontainer} ref={ref}>

      <div className={post.img ? PostComponentStyles.imgUsernameButton : PostComponentStyles.usernameButton}>
        <NavLink to={`/user/${post.username}`}>
          <div className={PostComponentStyles.username}>
            <img src={user.img} alt="" width={35} height={35} className={PostComponentStyles.userImg}/>
            <div>
              <h3>{post.username}</h3>
              <p className={PostComponentStyles.smalltext}>30 Min Ago</p>
            </div>
          </div>
        </NavLink>

        <div className={PostComponentStyles.buttons}>
          <img
            src={post.likes.likeCount === 0 ? Like : Liked}
            alt=""
            onClick={() => handleLike(post.likes.likeCount, post._id, auth, navigate, dispatch)}
            width={25}
            height={25}
          />

          {post.username === userState.currentUser.username ? (
            <>
              <img src={Remove} alt="" onClick={() => handleDelete(post._id, auth, dispatch)} width={25} height={25}/>
              <img src={Edit} alt="" onClick={() => handleEdit(post.content, post._id, dispatch, navigate)} width={21} height={21} className={PostComponentStyles.editIcon}/>
            </>
          ) : (
            <>
              <img src={Comment} alt="" width={25} height={25} onClick={() => handleFeatureComing(toast)}/>
              <img src={Share} alt="" width={25} height={25}
                onClick={() =>handleFeatureComing(toast)}
              />
            </>
          )}
          <img
            onClick={() => handleBookmark(post._id, isBookmarked, auth, dispatch)}
            src={isBookmarked ? Bookmarked : Bookmark}
            alt=""
            width={23}
            height={23}
          />
        </div>
      </div>
      <div className={PostComponentStyles.imgAndPost}>
        <div className={PostComponentStyles.content}>
          <p>{post.content}</p>
        </div>
        {post.img && <img src={post.img} alt="" width={380} height={300} />}
      </div>
    </div>
  );
})
PostComponent.displayName = 'PostComponent'