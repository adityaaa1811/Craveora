import React, { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Input = React.forwardRef(({
  label,
  type = "text",
  error = "",
  helperText = "",
  prefix,
  suffix,
  className = "",
  id: customId,
  disabled = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-semibold select-none ${
            disabled ? "text-text-muted" : "text-text-secondary"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {/* Prefix Element */}
        {prefix && (
          <div className="absolute left-4 flex items-center pointer-events-none text-text-muted">
            {prefix}
          </div>
        )}

        {/* Core Input Element */}
        <input
          ref={ref}
          id={id}
          type={inputType}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ""} ${helperText ? helperId : ""}`.trim() || undefined}
          className={`w-full text-text-primary bg-surface border rounded-full py-3 transition-all duration-300 placeholder-text-muted focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
            prefix ? "pl-11" : "pl-5"
          } ${
            suffix || isPassword ? "pr-11" : "pr-5"
          } ${
            error
              ? "border-error focus:border-error focus:ring-error/10"
              : "border-border focus:border-primary focus:ring-primary/10"
          } ${className}`}
          {...props}
        />

        {/* Suffix Element / Password Visibility Toggle */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            className="absolute right-4 p-0.5 rounded-full text-text-muted hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        ) : (
          suffix && (
            <div className="absolute right-4 flex items-center text-text-muted">
              {suffix}
            </div>
          )
        )}
      </div>

      {/* Error & Helper Messages */}
      {error ? (
        <span id={errorId} className="text-xs text-error font-medium px-2">
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} className="text-xs text-text-muted px-2">
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
