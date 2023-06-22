import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { AuthContext } from "../Contexts/AuthContext";
import { useState } from "react";
import { Avatars } from "../Local Database/Avatars";
import { Nav } from "../Components/Nav";
import HomeStyles from "./Home.module.css";
import ProfileStyles from "./Profile.module.css";

export const Profile = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [dialogOpen, setDialogOpen] = useState({ bio: false, avatar: false });
  const [changedUser, setChangedUser] = useState({
    userData: userState.currentUser,
  });
  const { auth } = useContext(AuthContext);

  const handleBioEdit = () => {
    (async () => {
      try {
        const serverCall = await fetch("/api/users/edit", {
          method: "POST",
          headers: { authorization: auth },
          body: JSON.stringify(changedUser),
        });
        const newUser = await serverCall.json();
        userDispatch({ type: "SET_CURRENT_USER", payload: newUser.user });
      } catch (err) {
        console.error(err);
      }
    })();
    setDialogOpen((prev) => ({ ...prev, bio: false }));
  };

  const handleAvatarEdit = () => {
    (async () => {
      try {
        const serverCall = await fetch("/api/users/edit", {
          method: "POST",
          headers: { authorization: auth },
          body: JSON.stringify(changedUser),
        });
        const newUser = await serverCall.json();
        userDispatch({ type: "SET_CURRENT_USER", payload: newUser.user });
      } catch (err) {
        console.error(err);
      }
    })();
    setDialogOpen((prev) => ({ ...prev, avatar: false }));
  };

  if (auth.length === 0) {
    return (
      <>
        <Nav />
        <h2>Login First</h2>
      </>
    );
  }
  return (
    <div className={HomeStyles.home}>
      <Nav />
      <div className={ProfileStyles.avatarContainer}>
        <img src={userState.currentUser.img} alt="" width={100} height={100} />
        <h2 style={{ marginBottom: "0px" }}>
          {userState.currentUser.username}
        </h2>
        <p style={{ "font-family": "Recursive, sans-serif", marginTop: "0px" }}>
          {userState.currentUser.firstName} {userState.currentUser.lastName}
        </p>s
      </div>
      <div className={ProfileStyles.bioContainer}>
        <p>
          Bio : <br /> <i>{userState.currentUser.bio}</i>
        </p>
        <p>Following : {userState.currentUser.following.length}</p>
        <p>Followers : {userState.currentUser.followers.length}</p>
      </div>
      <dialog open={dialogOpen.bio}>
        <p>Type your new Bio Here</p>
        <input
          type="text"
          onChange={(e) =>
            setChangedUser({
              userData: { ...changedUser.userData, bio: e.target.value },
            })
          }
        />
        <button onClick={() => handleBioEdit()}>Save</button>
      </dialog>
      <dialog open={dialogOpen.avatar}>
        <p>Select your new Avatar here</p>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {Avatars.map((av) => {
            return (
              <li key={av} style={{ listStyle: "none" }}>
                <img
                  src={av}
                  alt=""
                  width={50}
                  height={50}
                  onClick={(e) =>
                    setChangedUser({
                      userData: { ...changedUser.userData, img: e.target.src },
                    })
                  }
                />
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleAvatarEdit()}>Save</button>
      </dialog>
      <div className={ProfileStyles.buttonContainer}>
        <button
          onClick={() => setDialogOpen((prev) => ({ ...prev, avatar: true }))}
        >
          Change Avatar
        </button>
        <button
          onClick={() => setDialogOpen((prev) => ({ ...prev, bio: true }))}
        >
          Change Bio
        </button>
      </div>
    </div>
  );
};
