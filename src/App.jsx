import { makeServer } from "./server";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import { DataProvider } from "./Contexts/DataContext";
import { AuthProvider } from "./Contexts/AuthContext";
import Login from "./Pages/Login";
import { UserProvider } from "./Contexts/UserContext";
import { User } from "./Components/User";
import { Selected } from "./Pages/Selected";
import { Bookmark } from "./Pages/Bookmark";
import { Profile } from "./Pages/Profile";
import { Header } from "./Components/Header";
import { Search } from "./Components/Search";
import { RequiresAuth } from "./Utils/RequiresAuth";
import { ResponsiveNav } from "./Components/ResponsiveNav";
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
                        <Selected />
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
    </>
  );
}

export default App;
