/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

const handleUser = (state, action) => {
  switch (action.type) {
    case "SET_ALL_USERS":
      return { ...state, allUsers: action.payload };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "UPDATE_ALL_USER":
      return {
        ...state,
        allUsers: state.allUsers.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "UPDATE_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        allUsers: state.allUsers.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "UPDATE_FOLLOWING":
      return {
        ...state,
        followingUsers: [...state.followingUsers, action.payload],
      };
    case "OUTDATE_FOLLOWING":
      return {
        ...state,
        followingUsers: [state.followingUsers.filter(user => user!==action.payload)],
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(handleUser, {
    allUsers: [],
    currentUser: {},
    followingUsers: [],
  });
    useEffect(() => {console.log(userState)}, [userState]);

  useEffect(() => {
    (async () => {
      try {
        const serverCall = await fetch("/api/users", {
          method: "GET",
        });
        const users = await serverCall.json();
        userDispatch({ type: "SET_ALL_USERS", payload: users.users });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
