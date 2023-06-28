import { makeServer } from "./server";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DataProvider } from "./Contexts/DataContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { UserProvider } from "./Contexts/UserContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Feed } from "./Pages/Feed/Feed";
import { Bookmark } from "./Pages/Bookmark/Bookmark";
import { Profile } from "./Pages/Profile/Profile";
import { User } from "./Components/User/User";
import { ResponsiveNav } from "./Components/ResponsiveNav/ResponsiveNav";
import { Header } from "./Components/Header/Header";
import { Search } from "./Components/Search/Search";
import { RequiresAuth } from "./Utils/RequiresAuth";
import "./App.css";

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
              <div className="app-layout">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/user/:username" element={<User />} />
                  <Route
                    path="/selected"
                    element={
                      <RequiresAuth>
                        <Feed />
                      </RequiresAuth>
                    }
                  />
                  <Route
                    path="/bookmarks"
                    element={
                      <RequiresAuth>
                        <Bookmark />
                      </RequiresAuth>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <RequiresAuth>
                        <Profile />
                      </RequiresAuth>
                    }
                  />
                  <Route path="/search" element={<Search />} />
                </Routes>
                <div className="searchContainer">
                  <Search />
                </div>
                <ResponsiveNav/>
              </div>
            </UserProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
