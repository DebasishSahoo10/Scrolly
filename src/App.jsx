import { makeServer } from "./server";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DataProvider } from "./Contexts/DataContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { UserProvider } from "./Contexts/UserContext";
import Home from "./Pages/Home/Home";
import { ResponsiveNav } from "./Components/ResponsiveNav/ResponsiveNav";
import { Header } from "./Components/Header/Header";
import { RequiresAuth } from "./Utils/RequiresAuth";
import "./App.css";

const Login = lazy(() => import("./Pages/Login/Login"))
const Bookmark = lazy(() => import("./Pages/Bookmark/Bookmark"))
const Feed = lazy(() => import("./Pages/Feed/Feed"))
const Profile = lazy(() => import("./Pages/Profile/Profile"))
const Search = lazy(() => import("./Components/Search/Search"))
const User = lazy(() => import("./Components/User/User"))
const Signup = lazy(()=> import("./Pages/Signup/Signup"))

// Call make Server
makeServer();

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <DataProvider>
            <UserProvider>
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
            </UserProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
