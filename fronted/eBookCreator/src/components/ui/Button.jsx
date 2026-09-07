import React from "react";

const Button = ({
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    icon,
    className = "",
    ...props
}) => {

    const variants = {
        primary:
            "bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white shadow-lg shadow-violet-500/20",

        secondary:
            "bg-gray-100 hover:bg-gray-200 text-gray-700",

        ghost:
            "bg-transparent hover:bg-gray-100 text-gray-700",

        danger:
            "bg-transparent hover:bg-red-50 text-red-600",
    };


    const sizes = {
        sm:
            "px-3 py-1.5 text-sm h-8 rounded-lg",

        md:
            "px-4 py-2.5 text-sm h-11 rounded-xl",

        lg:
            "px-6 py-3 text-base h-12 rounded-xl",
    };
    const renderIcon = () => {

        if (!icon) {
            return null;
        }
        if (React.isValidElement(icon)) {
            return (
                <span className="mr-2 flex items-center">
                    {icon}
                </span>
            );
        }
        if (
            typeof icon === "function" ||
            typeof icon === "object"
        ) {
            const IconComponent = icon;

            return (
                <span className="mr-2 flex items-center">
                    <IconComponent
                        className="w-4 h-4"
                    />
                </span>
            );
        }

        return null;
    };


    return (
        <button
            type="button"

            className={`
                inline-flex
                items-center
                justify-center
                font-medium
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed

                ${variants[variant] || variants.primary}

                ${sizes[size] || sizes.md}

                ${className}
            `}

            disabled={
                isLoading ||
                props.disabled
            }

            {...props}
        >

            {isLoading ? (

                <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                >

                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />

                </svg>

            ) : (

                <>
                    {renderIcon()}

                    {children}
                </>

            )}

        </button>
    );
};


export default Button;