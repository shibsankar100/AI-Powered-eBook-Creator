import React from "react";
import { BookOpen } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#08080f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-180px] right-[-100px] h-[420px] w-[650px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-150px] left-[35%] h-[300px] w-[500px] rounded-full bg-violet-600/15 blur-[110px]" />
        <div className="absolute left-[-150px] top-[-180px] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
          <div>
            <a
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
                <BookOpen
                  className="h-5 w-5 text-white"
                  strokeWidth={2}
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                eBook Creator
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Create, design, and publish stunning ebooks with
              the power of AI.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  text-gray-400
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  text-gray-400
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.287zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V8.999h3.554v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  text-gray-400
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.105 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.475 5.92.43.37.81 1.096.81 2.21v3.276c0 .32.21.694.825.576A12 12 0 0 0 12 .297" />
                </svg>
              </a>

            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#features"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="/#pricing"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/#templates"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Templates
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#about"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/#contact"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="/#blog"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#privacy"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="/#terms"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10" />
        <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {currentYear} eBook Creator. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with{" "}
            <span className="text-violet-400">♥</span>{" "}
            for creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;