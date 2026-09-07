import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import HERO_IMG from "../../assets/hero-img.png";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-400/10 blur-[110px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-300/5 blur-[100px]" />
        <div className="absolute -left-10 top-28 h-24 w-24 rotate-12 rounded-3xl border border-violet-200/60 bg-violet-200/20" />
        <div className="absolute -bottom-10 right-10 h-32 w-32 rotate-12 rounded-3xl border border-purple-200/60 bg-purple-200/20" />
        <div className="absolute left-[8%] top-[35%] h-2 w-2 rounded-full bg-violet-400/50" />
        <div className="absolute left-[12%] top-[55%] h-1.5 w-1.5 rounded-full bg-purple-400/50" />
        <div className="absolute right-[8%] top-[25%] h-2 w-2 rounded-full bg-violet-400/50" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <div
              className="
                mb-5 inline-flex items-center gap-2
                rounded-full border border-violet-200
                bg-white/80 px-4 py-2
                shadow-sm backdrop-blur-sm
              "
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              </span>

              <span className="text-xs font-bold tracking-wide text-violet-800 sm:text-sm">
                AI-Powered Publishing
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <h1
              className="
                text-4xl font-extrabold
                leading-[1.08] tracking-tight
                text-gray-900
                sm:text-5xl lg:text-6xl
              "
            >
              Create Stunning

              <span
                className="
                  mt-2 block
                  bg-gradient-to-r
                  from-violet-600 via-purple-600
                  to-fuchsia-600
                  bg-clip-text
                  text-transparent
                "
              >
                Ebooks in Minutes
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              From your first idea to a polished ebook, our AI-powered
              platform helps you write, design, and publish professional
              books effortlessly.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">

              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="
                  group inline-flex items-center gap-2
                  rounded-xl
                  bg-gradient-to-r from-violet-600 to-purple-600
                  px-5 py-3
                  text-sm font-bold text-white
                  shadow-lg shadow-violet-600/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:from-violet-700
                  hover:to-purple-700
                  hover:shadow-xl
                  sm:px-6 sm:py-3.5
                "
              >
                <span>Start Creating for Free</span>

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <a
                href="#demo"
                className="
                  group inline-flex items-center gap-2
                  rounded-xl border border-gray-200
                  bg-white/70 px-5 py-3
                  text-sm font-bold text-gray-700
                  shadow-sm backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-violet-200
                  hover:bg-white
                  hover:text-violet-700
                  hover:shadow-md
                  sm:px-6 sm:py-3.5
                "
              >
                <span
                  className="
                    flex h-6 w-6 items-center
                    justify-center rounded-full
                    bg-gray-100
                    transition-colors
                    group-hover:bg-violet-100
                  "
                >
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>

                <span>Watch Demo</span>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Start for free
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-7">

              <div>
                <div className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  50K+
                </div>

                <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Books Created
                </div>
              </div>

              <div className="hidden h-9 w-px bg-gray-200 sm:block" />

              <div>
                <div className="flex items-center gap-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                  4.9/5
                  <span className="text-sm text-yellow-500">★</span>
                </div>

                <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  User Rating
                </div>
              </div>

              <div className="hidden h-9 w-px bg-gray-200 sm:block" />
              <div>
                <div className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  10min
                </div>
                <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Avg. Creation
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] px-4 sm:px-8 lg:px-0">
            <div
              className="
                absolute inset-10
                rounded-[3rem]
                bg-violet-500/20
                blur-3xl
              "
            />

            <div
              className="
                relative z-10
                rounded-[2rem]
                border border-white/80
                bg-white/70
                p-2.5
                shadow-2xl
                shadow-violet-500/15
                backdrop-blur-xl
                sm:p-3
              "
            >
              <div className="flex items-center justify-between px-3 py-2">

                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                </div>

                <div
                  className="
                    rounded-md
                    bg-gray-100
                    px-3 py-1
                    text-[9px]
                    font-medium
                    text-gray-400
                  "
                >
                  eBook Creator
                </div>

                <div className="w-10" />
              </div>

              {/* Dashboard Image */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-gray-100
                  bg-white
                  shadow-inner
                "
              >
                <img
                  src={HERO_IMG}
                  alt="AI Ebook Creator Dashboard"
                  className="
                    block h-auto w-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.015]
                  "
                />
              </div>
            </div>
            <div
              className="
                absolute
                right-0
                top-12
                z-30

                flex items-center
                gap-2.5

                rounded-xl
                border border-gray-100
                bg-white/95

                px-3 py-2.5

                shadow-xl
                backdrop-blur-md

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-2xl

                sm:-right-3
                sm:top-16
                sm:gap-3
                sm:rounded-2xl
                sm:px-4
                sm:py-3.5
              "
            >
              {/* Icon */}

              <div
                className="
                  relative
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-violet-100
                  sm:h-11 sm:w-11
                "
              >
                <Zap
                  className="
                    h-4 w-4
                    text-violet-600
                    sm:h-5 sm:w-5
                  "
                />

                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    h-2.5 w-2.5
                    animate-pulse
                    rounded-full
                    bg-green-500
                    ring-2 ring-white
                  "
                />
              </div>
              <div className="whitespace-nowrap">
                <div className="text-[10px] text-gray-400 sm:text-xs">
                  Processing
                </div>

                <div className="text-xs font-bold text-gray-900 sm:text-sm">
                  AI Generation
                </div>
              </div>
            </div>
            <div
              className="
                absolute
                bottom-3
                left-0
                z-30

                flex items-center
                gap-2.5

                rounded-xl
                border border-gray-100
                bg-white/95

                px-3 py-2.5

                shadow-xl
                backdrop-blur-md

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-2xl

                sm:-bottom-5
                sm:-left-3
                sm:gap-3
                sm:rounded-2xl
                sm:px-4
                sm:py-3.5
              "
            >
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-green-100
                  sm:h-11 sm:w-11
                "
              >
                <BookOpen
                  className="
                    h-4 w-4
                    text-green-600
                    sm:h-5 sm:w-5
                  "
                />
              </div>

              {/* Text */}

              <div className="whitespace-nowrap">
                <div className="text-[10px] text-gray-400 sm:text-xs">
                  Completed
                </div>

                <div className="text-xs font-bold text-gray-900 sm:text-sm">
                  247 Pages
                </div>
              </div>
            </div>
            <div
              className="
                pointer-events-none
                absolute
                -bottom-7
                right-5
                -z-10
                h-20 w-20
                rounded-3xl
                border border-violet-200/50
                bg-violet-200/20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-5
                top-8
                -z-10
                h-16 w-16
                rotate-12
                rounded-2xl
                border border-purple-200/50
                bg-purple-200/20
              "
            />

          </div>
        </div>
      </div>
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-200/70
          to-transparent
        "
      />
    </section>
  );
};

export default Hero;