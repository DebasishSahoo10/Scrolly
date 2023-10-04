import { useNavigate, useParams } from "react-router";
import { Nav } from "../Nav/Nav";
import { PostComponent } from "../PostComponent/PostComponent";
import HomeStyles from "../../Pages/Home/Home.module.css";
import UserStyles from "./User.module.css";
import { handleFollow } from "../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const User = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth.auth);
  const isFollow = user?.currentUser?.following?.some(
    (user) => user.username === username
  );
  const data = useSelector(state => state.data);
  const selectedUser = user.allUsers.find(
    (user) => user.username === username
  );

  return (
    <div className={HomeStyles.home}>
      <Nav />
      <div className={UserStyles.user}>
        <img src={selectedUser.img} alt="" width={80} height={80} />
        <h2 style={{ margin: "0px" }}>{selectedUser.username}</h2>
        <p style={{ margin: "0px" }}>
          {selectedUser.firstName} {selectedUser.lastName}
        </p>
        <p style={{ margin: "0px" }}>
          <i>{selectedUser.bio}</i>
        </p>
        <p>
          Portfolio URL : {selectedUser?.portfolio}
        </p>
        <button
          onClick={() =>
            handleFollow(
              selectedUser._id,
              auth,
              navigate,
              isFollow,
              dispatch
            )
          }
          style={{
            display:
              selectedUser.username === user.currentUser.username &&
              "none",
          }}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
      <ul className={HomeStyles.postlists}>
        {data.posts
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
export default User;