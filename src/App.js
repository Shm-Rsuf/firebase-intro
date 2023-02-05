import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase/firebase.init";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import RequireAuth2 from "./components/RequireAuth2";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      } else {
        // console.log("No data");
      }
    });
  }, []);

  return (
    <div className="app">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <RequireAuth user={user}>
              <Profile user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            // <RequireAuth2 user={user}>
            <Login />
            // </RequireAuth2>
          }
        />
        <Route
          path="/register"
          element={
            // <RequireAuth2 user={user}>
            <Register setUser={setUser} user={user} />
            // </RequireAuth2>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
