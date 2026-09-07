import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  BookOpen,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  PenTool,
  WandSparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axioinstance";
import { API_PATHS } from "../utils/apiPaths";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      const token = response?.data?.token;

      if (!token) {
        throw new Error(
          "Token was not received from server."
        );
      }

      const profileResponse =
        await axiosInstance.get(
          API_PATHS.AUTH.GET_PROFILE,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Profile response:",
        profileResponse.data
      );

      login(profileResponse.data, token);

      toast.success(
        "Welcome back! Login successful."
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      toast.error(message);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowPassword(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes loginFade {
          from {
            opacity: 0;
            transform: translateX(-18px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes loginScale {
          from {
            opacity: 0;
            transform: scale(.97);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floatBook {
          0%, 100% {
            transform: translateY(0) rotate(-1deg);
          }

          50% {
            transform: translateY(-6px) rotate(1deg);
          }
        }

        @keyframes floatOne {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(5px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .3;
            transform: scale(1);
          }

          50% {
            opacity: .6;
            transform: scale(1.06);
          }
        }

        @keyframes sparkleRotate {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }

          50% {
            transform: rotate(12deg) scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        .login-fade {
          animation:
            loginFade
            .55s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .login-scale {
          animation:
            loginScale
            .5s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .book-float {
          animation:
            floatBook
            5s
            ease-in-out
            infinite;
        }

        .float-one {
          animation:
            floatOne
            4s
            ease-in-out
            infinite;
        }

        .float-two {
          animation:
            floatTwo
            5s
            ease-in-out
            infinite;
        }

        .pulse-glow {
          animation:
            pulseGlow
            4s
            ease-in-out
            infinite;
        }

        .sparkle-rotate {
          animation:
            sparkleRotate
            3s
            ease-in-out
            infinite;
        }

        .login-input {
          transition:
            border-color .2s ease,
            box-shadow .2s ease,
            transform .2s ease;
        }

        .login-input:focus-within {
          transform: translateY(-1px);
        }

        .login-link {
          transition:
            color .2s ease,
            transform .2s ease;
        }

        .login-link:hover {
          transform: translateX(2px);
        }

        .login-shimmer {
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.18),
              transparent
            );
        }

        .login-button-group:hover
        .login-shimmer {
          animation:
            shimmer
            .8s
            ease;
        }

        @media (max-width: 1023px) {
          html,
          body {
            overflow: auto;
          }
        }

        @media (min-width: 1024px) {
          html,
          body {
            overflow: hidden;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-fade,
          .login-scale,
          .book-float,
          .float-one,
          .float-two,
          .pulse-glow,
          .sparkle-rotate {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative h-[calc(100vh-68px)] overflow-hidden bg-[#f8f9fd]">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl" />

          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="absolute bottom-[-150px] left-[35%] h-72 w-72 rounded-full bg-purple-200/25 blur-3xl" />

          <div className="float-one absolute left-[8%] top-[25%] h-2 w-2 rounded-full bg-violet-300/60" />

          <div className="float-two absolute right-[10%] top-[35%] h-2.5 w-2.5 rounded-full bg-indigo-300/60" />

          <div className="float-two absolute bottom-[18%] left-[15%] h-2 w-2 rounded-full bg-purple-300/60" />

        </div>

        <main className="relative z-10 flex h-full items-center justify-center px-4 py-4 sm:px-6 lg:px-8">

          <div className="w-full max-w-5xl">

            <div className="grid items-center gap-8 lg:grid-cols-[1fr_400px]">

              <div className="login-fade hidden lg:block">

                <div className="px-5">

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">

                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-100 text-violet-600">

                      <Sparkles size={11} />

                    </span>

                    <span className="text-[11px] font-bold text-violet-700">
                      AI-powered publishing
                    </span>

                  </div>

                  <h1 className="max-w-lg text-[42px] font-black leading-[1.05] tracking-tight text-slate-900 xl:text-5xl">

                    Turn your ideas into

                    <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      beautiful eBooks.
                    </span>

                  </h1>

                  <p className="mt-4 max-w-md text-[15px] leading-6 text-slate-500">

                    Write, organize and publish your next
                    book with the power of AI — all from one
                    simple workspace.

                  </p>

                  <div className="relative mt-5 h-[190px]">

                    <div className="pulse-glow absolute left-16 top-12 h-36 w-36 rounded-full bg-violet-400/25 blur-3xl" />

                    <div className="book-float absolute left-12 top-2">

                      <div className="relative h-36 w-26">

                        <div className="absolute -bottom-4 left-1 h-6 w-24 rounded-[50%] bg-slate-900/10 blur-lg" />

                        <div className="relative h-full w-full overflow-hidden rounded-r-xl rounded-l-md border border-violet-300 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 shadow-xl shadow-violet-500/30">

                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />

                          <div className="absolute right-0 top-0 h-full w-1.5 bg-white/10" />

                          <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">

                            <BookOpen className="mb-3 h-7 w-7 text-white/90" />

                            <div className="text-[9px] font-black uppercase tracking-[.2em] text-white/80">
                              Your
                            </div>

                            <div className="mt-1 text-base font-black leading-tight text-white">
                              Story
                            </div>

                            <div className="mt-3 h-px w-10 bg-white/40" />

                            <div className="mt-1.5 text-[6px] font-semibold uppercase tracking-widest text-white/60">
                              AI eBook Creator
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="float-one absolute left-44 top-0 rounded-xl border border-white/80 bg-white/90 p-2.5 shadow-lg backdrop-blur">

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">

                          <WandSparkles size={15} />

                        </div>

                        <div>

                          <p className="text-[10px] font-black text-slate-800">
                            AI Writing
                          </p>

                          <p className="text-[8px] font-medium text-slate-400">
                            Create chapters faster
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="float-two absolute bottom-1 left-0 rounded-xl border border-white/80 bg-white/90 p-2.5 shadow-lg backdrop-blur">

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">

                          <PenTool size={14} />

                        </div>

                        <div>

                          <p className="text-[10px] font-black text-slate-800">
                            Easy Editor
                          </p>

                          <p className="text-[8px] font-medium text-slate-400">
                            Write without limits
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="flex gap-6">

                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">

                      <ShieldCheck
                        size={15}
                        className="text-violet-500"
                      />

                      Secure workspace

                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">

                      <WandSparkles
                        size={15}
                        className="text-violet-500"
                      />

                      AI assisted

                    </div>

                  </div>

                </div>

              </div>

              <div className="login-scale w-full">

                <div className="mb-3 flex justify-center lg:hidden">

                  <Link
                    to="/"
                    className="group flex items-center gap-2"
                  >

                    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">

                      <BookOpen className="relative h-4 w-4" />

                      <Sparkles
                        size={9}
                        className="sparkle-rotate absolute -right-1 -top-1 text-violet-300"
                      />

                    </div>

                    <div>

                      <div className="text-base font-black tracking-tight text-slate-900">

                        AI eBook{" "}

                        <span className="text-violet-600">
                          Creator
                        </span>

                      </div>

                      <div className="text-[7px] font-bold uppercase tracking-[.15em] text-slate-400">
                        Create • Write • Publish
                      </div>

                    </div>

                  </Link>

                </div>

                <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,.10)]">

                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                  <div className="p-5 sm:p-6">

                    <div className="mb-4 text-center">

                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-6 ring-violet-50/60">

                        <Lock size={18} />

                      </div>

                      <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                        Welcome back
                      </h2>

                      <p className="mx-auto mt-1 max-w-xs text-[11px] leading-5 text-slate-500">

                        Sign in to continue creating your
                        next great eBook.

                      </p>

                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-2.5"
                    >

                      <div className="login-input">

                        <InputField
                          label="Email address"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          icon={Mail}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                        />

                      </div>

                      <div className="relative login-input">

                        <InputField
                          label="Password"
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter your password"
                          icon={Lock}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          autoComplete="current-password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (previous) => !previous
                            )
                          }
                          className="absolute right-2.5 top-[34px] z-10 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-violet-600"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >

                          {showPassword ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}

                        </button>

                      </div>

                      <div className="login-button-group relative overflow-hidden rounded-lg pt-0.5">

                        <div className="login-shimmer pointer-events-none z-20" />

                        <Button
                          type="submit"
                          isLoading={isLoading}
                          className="relative w-full !rounded-lg !py-2.5 !text-xs !font-bold shadow-md shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25"
                        >
                          {isLoading
                            ? "Signing in..."
                            : "Sign In"}
                        </Button>

                      </div>

                    </form>

                    <div className="mt-3 text-center">

                      <p className="text-[11px] text-slate-500">

                        Don't have an account?{" "}

                        <Link
                          to="/signup"
                          className="font-bold text-violet-600 transition hover:text-violet-700"
                        >
                          Create one
                        </Link>

                      </p>

                    </div>

                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 px-2.5 py-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                        <ShieldCheck size={13} />

                      </div>

                      <div>

                        <p className="text-[9px] font-black text-slate-700">
                          Secure account
                        </p>

                        <p className="text-[8px] leading-3 text-slate-400">
                          Your credentials are protected.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-2 flex justify-center">

                  <Link
                    to="/"
                    className="login-link text-[10px] font-bold text-slate-400 hover:text-violet-600"
                  >
                    ← Back to home
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>
    </>
  );
};

export default LoginPage;