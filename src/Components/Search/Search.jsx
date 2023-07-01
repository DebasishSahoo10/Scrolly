import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import SearchStyles from "./Search.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Search = () => {
  const { userState } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUser = userState.allUsers.filter(
    (user) =>
      user.username !== userState.currentUser.username &&
      user.username.includes(searchQuery)
  );
  return (
    <div className={SearchStyles.search}>
      <div>
        <p>Search Users</p>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search username here"
        />
      </div>
      <div>
        <p>{searchQuery === "" ? "Suggested Users" : "Searched Users"}</p>
        <ul className={SearchStyles.userlist}>
          {filteredUser.map((user) => {
            return (
              <li key={user._id}>
                <NavLink
                  to={`/user/${user.username}`}
                  className={SearchStyles.username}
                >
                  <img src={user.img} alt="" width={40} height={40} />
                  <div>
                    <p>{user.username}</p>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Search;