import React from "react";
import {
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashBoardpage";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/layout/Navbar";

const AppContent = () => {
    const location = useLocation();
    const publicRoutes = [
        "/",
        "/login",
        "/signup",
    ];

    const shouldShowNavbar = publicRoutes.includes(
        location.pathname
    );

    return (
        <div className="min-h-screen">
            {shouldShowNavbar && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/editor/:bookId"
                    element={
                        <ProtectedRoute>
                            <EditorPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </div>
    );
};

const App = () => {
    return <AppContent />;
};

export default App;