import { ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-gray-50"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={companyName || "User"}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-100"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-semibold text-white shadow-sm">
            {companyName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <div className="hidden text-left sm:block">

          <p className="max-w-[140px] truncate text-sm font-semibold text-gray-900">
            {companyName || "User"}
          </p>

          <p className="max-w-[140px] truncate text-xs text-gray-500">
            {email || ""}
          </p>

        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />

      </button>

      {isOpen && (

        <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          <div className="border-b border-gray-100 bg-gray-50/70 px-4 py-4">
            <div className="flex items-center gap-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt={companyName || "User"}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-semibold text-white">
                  {companyName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="min-w-0">

                <p className="truncate font-semibold text-gray-900">
                  {companyName || "User"}
                </p>

                <p className="truncate text-sm text-gray-500">
                  {email || ""}
                </p>

              </div>

            </div>

          </div>
          <div className="p-2">
            <button
              type="button"
              onClick={handleProfile}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-600"
            >

              <User className="h-4 w-4" />

              <span>
                View Profile
              </span>

            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >

              <LogOut className="h-4 w-4" />

              <span>
                Sign out
              </span>

            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default ProfileDropdown;