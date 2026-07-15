import React from "react";
import { Search, X } from "lucide-react";
import Input from "../Input";

export const SearchInput = React.forwardRef(({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  disabled = false,
  ...props
}, ref) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: "" } });
    }
  };

  const hasValue = !!value;

  const clearButton = hasValue ? (
    <button
      type="button"
      onClick={handleClear}
      disabled={disabled}
      className="p-1 rounded-full text-text-muted hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50"
      aria-label="Clear search query"
    >
      <X className="w-4 h-4" />
    </button>
  ) : null;

  return (
    <Input
      ref={ref}
      type="search"
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      prefix={<Search className="w-4 h-4" />}
      suffix={clearButton}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
