import SearchStyles from "./Search.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const user = useSelector(state => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUser = user.allUsers.filter(
    (user) =>
      user.username !== user.currentUser?.username &&
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