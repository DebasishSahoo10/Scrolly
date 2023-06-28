import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { UserContext } from "../../Contexts/UserContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataContext } from "../../Contexts/DataContext";
import { Nav } from "../Nav/Nav";
import { PostComponent } from "../PostComponent/PostComponent";
import HomeStyles from "../../Pages/Home/Home.module.css";
import UserStyles from "./User.module.css";
// eslint-disable-next-line react/prop-types
export const User = () => {
 
  const navigate = useNavigate();
  const { username } = useParams();
  const { userState, userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [isFollow, setIsFollow] = useState(userState?.currentUser?.following?.some(user => user.username===username) ?? false)
  const {state} = useContext(DataContext)
  const selectedUser = userState.allUsers.find(
    (user) => user.username === username
  );
  const handleFollow = (id) => {
    if (auth.length === 0) {
      navigate("/login");
      return;
    }
    if (!isFollow) {
      (async () => {
        try {
          const serverCall = await fetch("/api/users/follow/" + id, {
            method: "POST",
            headers: {
              authorization: auth,
            },
          });
          const returnedUsersData = await serverCall.json();
          userDispatch({
            type: "UPDATE_ALL_USER",
            payload: returnedUsersData.followUser,
          });
          userDispatch({
            type: "UPDATE_CURRENT_USER",
            payload: returnedUsersData.user,
          });
          userDispatch({
            type: "UPDATE_FOLLOWING",
            payload: returnedUsersData.followUser.username,
          });
          setIsFollow(true)
        } catch (err) {
          console.error(err);
        }
      })();
    } else {
      (async () => {
        try {
          const serverCall = await fetch("/api/users/unfollow/" + id, {
            method: "POST",
            headers: {
              authorization: auth,
            },
          });
          const returnedUsersData = await serverCall.json();
          userDispatch({
            type: "UPDATE_ALL_USER",
            payload: returnedUsersData.followUser,
          });
          userDispatch({
            type: "UPDATE_CURRENT_USER",
            payload: returnedUsersData.user,
          });
          userDispatch({
            type: "OUTDATE_FOLLOWING",
            payload: returnedUsersData.followUser.username,
          });
          setIsFollow(false)
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  return (
    <div className={HomeStyles.home}>
      <Nav />
      <div className={UserStyles.user}>
        <img src={selectedUser.img} alt="" width={80} height={80} />
        <h2>{selectedUser.username}</h2>
        <p>
          {selectedUser.firstName} {selectedUser.lastName}
        </p>
        <p>
          <i>{selectedUser.bio}</i>
        </p>
        <button onClick={() => handleFollow(selectedUser._id)} style={{display : selectedUser.username===userState.currentUser.username && "none"}}>
          {isFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
      <ul className={HomeStyles.postlists}>
        {state.posts.filter(post => post.username===selectedUser.username).map(post => {
          return (
            <li key={post._id} style={{ listStyle: "none" }}>
              <PostComponent post={post} />
            </li>
          )
        })}
      </ul>
    </div>
  );
};
