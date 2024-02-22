// App.tsx

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Load from "./pages/Load";
import Address from "./pages/Address";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Store from "./pages/Store";

const App: React.FC = () => {
  const { auth } = useAuth();

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={auth[0] ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/load" element={<Load />} />
              <Route path="/login" element={<Login />} />
              <Route path="/address" element={<Address />} />
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search/:name" element={<Search />} />
              <Route path="/store/:id" element={<Store />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
