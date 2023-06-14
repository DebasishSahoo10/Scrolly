import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

// eslint-disable-next-line react/prop-types
export const User = () => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const { username } = useParams();
  const { userState, userDispatch } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  console.log(userState.allUsers)
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
          userDispatch({type : "UPDATE_ALL_USER", payload : returnedUsersData.followUser})
          userDispatch({type : "UPDATE_CURRENT_USER", payload : returnedUsersData.user})
          userDispatch({type : "UPDATE_FOLLOWING", payload : returnedUsersData.followUser.username})
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
          userDispatch({type : "UPDATE_ALL_USER", payload : returnedUsersData.followUser})
          userDispatch({type : "UPDATE_CURRENT_USER", payload : returnedUsersData.user})
          setIsFollow(false);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <p>
        {selectedUser.firstName} {selectedUser.lastName}
      </p>
      <p>{selectedUser.username}</p>
      <button onClick={() => handleFollow(selectedUser._id)}>
        {isFollow ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
