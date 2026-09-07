import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

import {
  Menu,
  X,
  BookOpen,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState(false);

  const profileRef = useRef(null);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const navLinks = [
    {
      name: "Features",
      href: "/#features",
    },
    {
      name: "Testimonials",
      href: "/#testimonials",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setProfileDropdownOpen(false);
  };

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <style>{`
        @keyframes navbarDrop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileMenuIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileItemIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            box-shadow:
              0 7px 20px
              rgba(124,58,237,.18);
          }

          50% {
            box-shadow:
              0 10px 30px
              rgba(124,58,237,.34);
          }
        }

        @keyframes sparkleFloat {
          0%,100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-2px) rotate(8deg);
          }
        }

        .navbar-enter {
          animation:
            navbarDrop
            .45s
            cubic-bezier(.22,1,.36,1);
        }

        .mobile-menu-enter {
          animation:
            mobileMenuIn
            .3s
            cubic-bezier(.22,1,.36,1);
        }

        .mobile-item {
          animation:
            mobileItemIn
            .3s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .navbar-logo {
          animation:
            logoGlow
            4s
            ease-in-out
            infinite;
        }

        .navbar-sparkle {
          animation:
            sparkleFloat
            2.5s
            ease-in-out
            infinite;
        }

        .nav-link {
          position: relative;
          transition:
            color .2s ease,
            background .2s ease,
            transform .2s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 3px;
          width: 0;
          height: 2px;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              #7c3aed,
              #4f46e5
            );
          transform: translateX(-50%);
          transition: width .25s ease;
        }

        .nav-link:hover::after {
          width: 22px;
        }

        .nav-link:hover {
          transform: translateY(-1px);
        }

        .navbar-button {
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            background .18s ease;
        }

        .navbar-button:hover {
          transform: translateY(-1px);
        }

        .navbar-button:active {
          transform: scale(.97);
        }

        .mobile-nav-link {
          transition:
            transform .18s ease,
            background .18s ease,
            color .18s ease;
        }

        .mobile-nav-link:hover {
          transform: translateX(3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-enter,
          .mobile-menu-enter,
          .mobile-item,
          .navbar-logo,
          .navbar-sparkle {
            animation: none !important;
          }
        }
      `}</style>

      <header className="navbar-enter sticky top-0 z-[100] w-full border-b border-slate-200/70 bg-white/90 shadow-[0_4px_25px_rgba(15,23,42,.035)] backdrop-blur-2xl">

        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 opacity-80" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-[68px] items-center justify-between">

            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex min-w-0 items-center gap-2.5"
            >

              <div className="navbar-logo relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white">

                <div className="absolute inset-0 rounded-xl bg-violet-500 opacity-20 blur-xl" />

                <BookOpen
                  className="relative h-[19px] w-[19px] transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                />

                <Sparkles
                  className="navbar-sparkle absolute -right-1 -top-1 h-3 w-3 text-violet-300"
                />

              </div>

              <div className="hidden sm:block">

                <div className="flex items-center gap-1.5">

                  <span className="text-[17px] font-black tracking-tight text-slate-900">
                    AI eBook
                  </span>

                  <span className="text-[17px] font-black tracking-tight text-violet-600">
                    Creator
                  </span>

                </div>

                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-slate-400">
                  Create • Write • Publish
                </p>

              </div>

            </a>

            {!isAuthPage && (
              <nav className="hidden items-center gap-1 lg:flex">

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="nav-link rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-violet-50/70 hover:text-violet-600"
                  >
                    {link.name}
                  </a>
                ))}

              </nav>
            )}

            <div
              ref={profileRef}
              className="hidden items-center gap-2.5 lg:flex"
            >

              {isAuthenticated ? (

                <ProfileDropdown
                  isOpen={profileDropdownOpen}
                  onToggle={(event) => {
                    event?.stopPropagation();

                    setProfileDropdownOpen(
                      (previous) => !previous
                    );
                  }}
                  avatar={user?.avatar || ""}
                  companyName={user?.name || ""}
                  email={user?.email || ""}
                  onLogout={handleLogout}
                />

              ) : (

                <>

                  <a
                    href="/login"
                    className="navbar-button rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    Login
                  </a>

                  <a
                    href="/signup"
                    className="navbar-button group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30"
                  >

                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <Sparkles
                      size={14}
                      className="relative"
                    />

                    <span className="relative">
                      Get Started
                    </span>

                    <ChevronRight
                      size={14}
                      className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                    />

                  </a>
                </>
              )}

            </div>

            <button
              type="button"
              onClick={() =>
                setIsOpen((previous) => !previous)
              }
              className="navbar-button flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >

              {isOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}

            </button>

          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu-enter border-t border-slate-100 bg-white lg:hidden">

            <div className="mx-auto max-w-7xl px-4 pb-5 pt-3 sm:px-6">

              {!isAuthPage && (
                <nav className="space-y-1">

                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleNavClick}
                      className="mobile-item mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >

                      <span>
                        {link.name}
                      </span>

                      <ChevronRight
                        size={15}
                        className="text-slate-300"
                      />

                    </a>
                  ))}

                </nav>
              )}

              <div
                className={`${
                  !isAuthPage
                    ? "mt-3 border-t border-slate-100 pt-4"
                    : "pt-2"
                }`}
              >

                {isAuthenticated ? (

                  <div>

                    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">

                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-black text-white shadow-md shadow-violet-200">

                        {user?.avatar ? (

                          <img
                            src={user.avatar}
                            alt={user?.name || "User"}
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <span>
                            {userInitial}
                          </span>

                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-black text-slate-900">
                          {user?.name || "User"}
                        </p>

                        <p className="mt-0.5 truncate text-xs font-medium text-slate-400">
                          {user?.email || ""}
                        </p>

                      </div>

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="navbar-button flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                    >

                      <LogOut size={16} />

                      Sign out

                    </button>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-3">

                    <a
                      href="/login"
                      onClick={handleNavClick}
                      className="navbar-button flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Login
                    </a>

                    <a
                      href="/signup"
                      onClick={handleNavClick}
                      className="navbar-button flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700"
                    >

                      <Sparkles size={15} />

                      Get Started

                    </a>

                  </div>

                )}

              </div>

            </div>
          </div>
        )}

      </header>
    </>
  );
};

export default Navbar;