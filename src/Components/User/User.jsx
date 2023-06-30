import { useContext } from "react";
import { useNavigate, useParams } from "react-router";

import { UserContext } from "../../Contexts/UserContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataContext } from "../../Contexts/DataContext";
import { Nav } from "../Nav/Nav";
import { PostComponent } from "../PostComponent/PostComponent";
import HomeStyles from "../../Pages/Home/Home.module.css";
import UserStyles from "./User.module.css";
import { handleFollow } from "../../Utils/utils";
// eslint-disable-next-line react/prop-types
export const User = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { userState, userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const isFollow = userState?.currentUser?.following?.some(
    (user) => user.username === username
  );
  const { state } = useContext(DataContext);
  const selectedUser = userState.allUsers.find(
    (user) => user.username === username
  );
  
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
        <button
          onClick={() => handleFollow(selectedUser._id, auth, navigate, isFollow, userDispatch)}
          style={{display : selectedUser.username === userState.currentUser.username && "none"}}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
      <ul className={HomeStyles.postlists}>
        {state.posts
          .filter((post) => post.username === selectedUser.username)
          .map((post) => {
            return (
              <li key={post._id} style={{ listStyle: "none" }}>
                <PostComponent post={post} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
