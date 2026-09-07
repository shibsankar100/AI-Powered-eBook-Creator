import React from "react";
import { AlertCircle } from "lucide-react";

const TextareaField = ({
  label,
  name,
  value = "",
  onChange,
  placeholder = "",
  rows = 5,
  error = "",
  helperText = "",
  required = false,
  disabled = false,
  maxLength,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-semibold text-gray-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full
            resize-y
            rounded-xl
            border
            bg-white
            px-4
            py-3
            text-sm
            text-gray-900
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-200

            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            }

            ${
              disabled
                ? "cursor-not-allowed bg-gray-50 text-gray-500"
                : "hover:border-gray-300"
            }
          `}
          {...props}
        />
        {maxLength && (
          <div className="pointer-events-none absolute bottom-2.5 right-3 rounded bg-white/90 px-1 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-red-500">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!error && helperText && (
        <p className="mt-1.5 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextareaField;