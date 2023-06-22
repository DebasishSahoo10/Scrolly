import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Nav } from "./Nav";
import HomeStyles from "../Pages/Home.module.css";
import UserStyles from "./User.module.css";
import { DataContext } from "../Contexts/DataContext";
import { PostComponent } from "./PostComponent";
// eslint-disable-next-line react/prop-types
export const User = () => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const { username } = useParams();
  const { userState, userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
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
          setIsFollow(true);
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
          setIsFollow(false);
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
        <button onClick={() => handleFollow(selectedUser._id)}>
          {isFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
      <ul className={UserStyles.user}>
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
