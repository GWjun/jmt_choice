// App.tsx

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import "./App.css";
import Load from "./pages/Load";

const App: React.FC = () => {
  const { auth } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={auth[0] ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/load" element={<Load />} />
            <Route path="/login" element={<Login />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
