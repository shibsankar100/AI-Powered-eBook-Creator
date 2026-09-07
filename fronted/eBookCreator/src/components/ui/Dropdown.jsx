import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div
            className="relative inline-block text-left"
            ref={dropdownRef}
        >
                        <div
                id="menu-button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div
                        className="py-1"
                        role="none"
                        onClick={() => setIsOpen(false)}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
export const DropdownItem = ({ children, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center px-4 py-2 text-left text-sm text-slate-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex="-1"
        >
            {children}
        </button>
    );
};

export default Dropdown;