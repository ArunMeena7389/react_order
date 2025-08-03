import React from "react";
import "../Input/Input.scss";

const DropdownComponent = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  options = [],
  placeholder = "Select an option",
  className = "",
  selectClass = "",
}) => {
  return (
    <div className={` ${className}`}>
      {label && (
        <label htmlFor={name} className="">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`custom-input-group ${error ? "error" : ""}`}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={`custom-input-field ${selectClass}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(error || helperText) && (
        <div className={`custom-helper-text ${error ? "error" : ""}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
