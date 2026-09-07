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
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-violet-500
                                    to-blue-600
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            >
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
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Product
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <a
                                    href="/#features"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    Features
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#pricing"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    Pricing
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#templates"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
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
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#contact"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    Contact
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#blog"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
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
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    Privacy
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#terms"
                                    className="
                                        text-sm
                                        text-gray-400
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
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