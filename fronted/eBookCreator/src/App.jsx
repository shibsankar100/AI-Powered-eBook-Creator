import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from  "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";



const App=() => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Rouutees */}
        <Route path="/" element ={<LandingPage />} />
        <Route path="/login" element ={<LoginPage />} />
        <Route path="/signup" element ={<SignupPage />} />

        {/* protected Routes */}
      <Route
      path="/dashboard"
      element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}
      />
      <Route
      path="/editor/:bookId"
      element={<ProtectedRoute><EditorPage/></ProtectedRoute>}
      />
      <Route
      path="/Profile"
      element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}
      />
      </Routes>
    </div>
  );
};
export default App;