import React from "react";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          {...props}
          className={`
            w-full
            h-11
            px-3
            py-2
            ${Icon ? "pl-10" : ""}
            border
            border-gray-200
            rounded-xl
            bg-white
            text-gray-900
            placeholder-gray-400
            outline-none
            transition-all
            duration-200
            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-500/20
            hover:border-gray-300
          `}
        />
      </div>
    </div>
  );
};

export default InputField;