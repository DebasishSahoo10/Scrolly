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
                  <Route path="/selected" element={<Selected />} />
                  <Route path="/bookmarks" element={<Bookmark />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <Search/>
              </div>
            </UserProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
