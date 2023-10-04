import { makeServer } from "./server";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./Pages/Home/Home";
import { ResponsiveNav } from "./Components/ResponsiveNav/ResponsiveNav";
import { Header } from "./Components/Header/Header";
import { RequiresAuth } from "./Utils/RequiresAuth";
import "./App.css";
import { useDispatch } from "react-redux";
import { SET_POSTS } from "./Redux/DataSlice";
import { SET_ALL_USERS } from "./Redux/UserSlice";

const Login = lazy(() => import("./Pages/Login/Login"));
const Bookmark = lazy(() => import("./Pages/Bookmark/Bookmark"));
const Feed = lazy(() => import("./Pages/Feed/Feed"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Search = lazy(() => import("./Components/Search/Search"));
const User = lazy(() => import("./Components/User/User"));
const Signup = lazy(() => import("./Pages/Signup/Signup"));

// Call make Server
makeServer();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const userServerCall = await fetch("/api/users", {
          method: "GET",
        });
        const users = await userServerCall.json();
        dispatch(SET_ALL_USERS(users.users));
        if (users) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [])
  useEffect(() => {
    (async () => {
      try {
        const serverCall = await fetch("/api/posts", {
          method: "GET",
        });
        const postArr = await serverCall.json();
        dispatch(SET_POSTS(postArr.posts));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <Suspense fallback={<h2>Page Loading...</h2>}>
        <div className="app-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:username" element={<User />} />
            <Route
              path="/selected"
              element={
                <RequiresAuth>
                  {" "}
                  <Feed />{" "}
                </RequiresAuth>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <RequiresAuth>
                  {" "}
                  <Bookmark />{" "}
                </RequiresAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequiresAuth>
                  {" "}
                  <Profile />{" "}
                </RequiresAuth>
              }
            />
            <Route path="/search" element={<Search />} />
          </Routes>
          <div className="searchContainer">
            <Search />
          </div>
          <ResponsiveNav />
        </div>
      </Suspense>

      <ToastContainer />
    </>
  )
}

export default App;
