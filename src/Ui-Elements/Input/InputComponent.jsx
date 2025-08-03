import React from "react";
import "./Input.scss";
import SvgIcon from "../../SvgIcon/SvgIcon";

const InputComponent = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error = "",
  helperText = "",
  className = "",
  inputClass = "",
  prefix = null,
  suffixIcon = null, // ✅ NEW
}) => {
  const onClearClick = () => {
    const syntheticEvent = {
      target: {
        value: "",
      },
    };
    onChange(syntheticEvent);
  };
  return (
    <div className={`custom-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="custom-input-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`custom-input-group ${error ? "error" : ""}`}>
        {prefix && <span className="custom-input-prefix">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`custom-input-field ${inputClass}`}
          autoComplete="off"
        />
        {suffixIcon && value && (
          <span
            className="custom-input-suffix"
            onClick={() => {
              onClearClick();
            }}
          >
            {
              <SvgIcon
                name="clear"
                width={16}
                height={16}
                className="text-secondary"
              />
            }
          </span>
        )}
      </div>

      {(error || helperText) && (
        <div className={`custom-helper-text ${error ? "error" : ""}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
