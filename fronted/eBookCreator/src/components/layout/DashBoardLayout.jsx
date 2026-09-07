import { useState, useEffect } from "react";
import { Album } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();

    const [profileDropdownOpen, setProfileDropdownOpen] =
        useState(false);

    useEffect(() => {
        const handleClickOutside = () => {
            setProfileDropdownOpen(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener(
                "click",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">

                <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                            <Album
                                className="h-5 w-5 text-white"
                                strokeWidth={2}
                            />
                        </div>

                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            AI eBook Creator
                        </span>
                    </Link>
                    {user && (
                        <div
                            className="relative"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <ProfileDropdown
                                isOpen={profileDropdownOpen}
                                onToggle={() => {
                                    setProfileDropdownOpen(
                                        (previous) => !previous
                                    );
                                }}
                                avatar={user?.avatar || ""}
                                companyName={user?.name || ""}
                                email={user?.email || ""}
                                onLogout={logout}
                            />
                        </div>
                    )}

                </div>
            </header>
            <main className="w-full">
                {children}
            </main>

        </div>
    );
};

export default DashboardLayout;