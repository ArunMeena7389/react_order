import React from "react";
// import '../Input/Input.scss'; // Keep same style file for consistency
import SvgIcon from "../../SvgIcon/SvgIcon";

const TextAreaComponent = ({
  label,
  name,
  placeholder = "",
  value,
  onChange,
  onBlur,
  onFocus,
  rows = 4,
  disabled = false,
  required = false,
  error = "",
  helperText = "",
  className = "",
  inputClass = "",
  prefix = null,
  suffixIcon = null,
}) => {
  const onClearClick = () => {
    const syntheticEvent = {
      target: {
        value: "",
        name,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <div className={`custom-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="custom-input-label form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`${error ? "error" : ""} d-flex align-items-start`}>
        {prefix && <span className="custom-input-prefix">{prefix}</span>}

        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`form-control ${inputClass} ${error ? "is-invalid" : ""}`}
        ></textarea>

        {suffixIcon && value && (
          <span className="custom-input-suffix mt-1" onClick={onClearClick}>
            <SvgIcon
              name="clear"
              width={16}
              height={16}
              className="text-secondary"
            />
          </span>
        )}
      </div>

      {(error || helperText) && (
        <div
          className={`custom-helper-text ${
            error ? "text-danger" : "text-muted"
          }`}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default TextAreaComponent;
