import { useEffect, useState } from "react";
import { Avatars } from "../../Local Database/Avatars";
import { Nav } from "../../Components/Nav/Nav";
import HomeStyles from "../Home/Home.module.css";
import ProfileStyles from "./Profile.module.css";
import { handleLogout, handleProfileEdit } from "../../Utils/utils";
import PencilEdit from "../../assets/Pencil.png";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth.auth)

  const [dialogOpen, setDialogOpen] = useState({ bio: false, avatar: false });
  const [changedUser, setChangedUser] = useState({userData: user.currentUser,});
  const [isPortfolioChange, setPortfolioChange] = useState(false)
  const [portfolio, setPortfolio] = useState("")

  const handlePortfolioEdit = () => {
    localStorage.setItem("portfolio", portfolio)
    setPortfolioChange(false)
  }

  useEffect(()=>{
    const newBio = localStorage.getItem("portfolio")
    if (newBio) {
      setPortfolio(newBio)
    } else {
      setPortfolio(user.currentUser.portfolio)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className={HomeStyles.home}>
      <Nav />

      <div className={ProfileStyles.avatarContainer}>
        <img src={user.currentUser.img} alt="" width={100} height={100} />
        <h2 style={{ marginBottom: "0px" }}>{user.currentUser.username}</h2>
        <p>
          {user.currentUser.firstName} {user.currentUser.lastName}
        </p>
        {!isPortfolioChange && <p>Portfolio URL : {portfolio} <img src={PencilEdit} alt="" width={20} height={20} onClick={()=>setPortfolioChange(true)}/> </p>}
        {isPortfolioChange && <div className={ProfileStyles.portfolioChange}><input type="text" placeholder="New Portfolio URL goes here" onChange={(e)=>setPortfolio(e.target.value)}/><button onClick={()=>handlePortfolioEdit()}>Save</button></div>}
      </div>

      <div className={ProfileStyles.bioContainer}>
        <p>Bio : <br /> <i>{user.currentUser.bio}</i></p>
        <p>Following : {user.currentUser.following.length}</p>
        <p>Followers : {user.currentUser.followers.length}</p>
      </div>

      <dialog open={dialogOpen.bio}>
        <div className={ProfileStyles.bio}>
          <p>Type your new Bio Here</p>
          <input type="text" onChange={(e) => setChangedUser({userData: { ...changedUser.userData, bio: e.target.value }})}/>
          <button onClick={() => handleProfileEdit("bio", auth, changedUser, dispatch, setDialogOpen)}>Save</button>
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
          <button onClick={() => handleProfileEdit("avatar", auth, changedUser, dispatch, setDialogOpen)}>Save</button>
        </div>
      </dialog>

      <div className={ProfileStyles.buttonContainer}>
        <button onClick={() => setDialogOpen((prev) => ({ ...prev, avatar: true }))}>Change Avatar</button>
        <button onClick={() => setDialogOpen((prev) => ({ ...prev, bio: true }))}>Change Bio</button>
        <button onClick={() => handleLogout(dispatch, dispatch)}>Log Out</button>
      </div>

    </div>
  );
};
export default Profile;