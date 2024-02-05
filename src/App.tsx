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
              <Route path="/adress" element={<Address />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
