import { useContext, useState } from "react";

import { UserContext } from "../../Contexts/UserContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { Avatars } from "../../Local Database/Avatars";
import { Nav } from "../../Components/Nav/Nav";
import HomeStyles from "../Home/Home.module.css";
import ProfileStyles from "./Profile.module.css";
import { handleLogout, handleProfileEdit } from "../../Utils/utils";

export const Profile = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState({ bio: false, avatar: false });
  const [changedUser, setChangedUser] = useState({userData: userState.currentUser,});

  return (
    <div className={HomeStyles.home}>
      <Nav />

      <div className={ProfileStyles.avatarContainer}>
        <img src={userState.currentUser.img} alt="" width={100} height={100} />
        <h2 style={{ marginBottom: "0px" }}>{userState.currentUser.username}</h2>
        <p style={{ fontFamily: "Recursive, sans-serif", marginTop: "0px" }}>
          {userState.currentUser.firstName} {userState.currentUser.lastName}
        </p>
      </div>

      <div className={ProfileStyles.bioContainer}>
        <p>Bio : <br /> <i>{userState.currentUser.bio}</i></p>
        <p>Following : {userState.currentUser.following.length}</p>
        <p>Followers : {userState.currentUser.followers.length}</p>
      </div>

      <dialog open={dialogOpen.bio}>
        <div className={ProfileStyles.bio}>
          <p>Type your new Bio Here</p>
          <input type="text" onChange={(e) => setChangedUser({userData: { ...changedUser.userData, bio: e.target.value }})}/>
          <button onClick={() => handleProfileEdit("bio", auth, changedUser, userDispatch, setDialogOpen)}>Save</button>
        </div>
      </dialog>

      <dialog open={dialogOpen.avatar}>
        <div className={ProfileStyles.avatar}>
          <p>Select your new Avatar here</p>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {Avatars.map((av) => {
              return (
                <li key={av} style={{ listStyle: "none" }}>
                  <img src={av} alt="" width={50} height={50}
                    onClick={(e) => setChangedUser({userData: {...changedUser.userData,img: e.target.src}})}
                  />
                  {changedUser.userData.img === av && (<div className={ProfileStyles.identifier}></div>)}
                </li>
              );
            })}
          </ul>
          <button onClick={() => handleProfileEdit("avatar", auth, changedUser, userDispatch, setDialogOpen)}>Save</button>
        </div>
      </dialog>

      <div className={ProfileStyles.buttonContainer}>
        <button onClick={() => setDialogOpen((prev) => ({ ...prev, avatar: true }))}>Change Avatar</button>
        <button onClick={() => setDialogOpen((prev) => ({ ...prev, bio: true }))}>Change Bio</button>
        <button onClick={() => handleLogout(authDispatch, userDispatch)}>Log Out</button>
      </div>

    </div>
  );
};