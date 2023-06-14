import { createContext, useEffect, useReducer } from "react";

const handleState = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "POSTFIELD_TRUE":
      return { ...state, newPostField: true };
    case "POSTFIELD_FALSE":
      return { ...state, newPostField: false };
    case "EDIT_TRUE" :
      return {...state, editingPost : true};
    case "EDIT_FALSE" :
      return {...state, editingPost : false};
    case "EDIT_POST" :
      return {...state, editableContent : action.payload};
    case "EDIT_ID" :
      return {...state, editingID : action.payload}
    default:
      return state;
  }
};

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        const serverCall = await fetch("/api/posts", {
          method: "GET",
        });
        const postArr = await serverCall.json();
        dispatch({ type: "SET_POSTS", payload: postArr.posts });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const [state, dispatch] = useReducer(handleState, {
    posts: [],
    newPostField: false,
    editingPost: false,
    editableContent: "",
    editingID : 0
  });
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
