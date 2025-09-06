import React, { Fragment } from "react";
import "./Textarea.scss";
import ButtonComponent from "../Button/ButtonComponent";
import SvgIcon from "../../SvgIcon/SvgIcon";

const TextAreaComponent = ({
  label,
  name,
  placeholder = "",
  value,
  onChange,
  onBlur,
  onFocus,
  handleAiPopup,
  rows = 4,
  disabled = false,
  required = false,
  error = "",
  helperText = "",
  className = "",
  inputClass = "",
  showAiButton = false,
  height = "170px",
}) => {
  return (
    <Fragment>
      <div className={`${className}`}>
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="required-star">*</span>}
          </label>
        )}

        <div className={`${error ? "error" : ""} relative`}>
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
            className={`mg-text-area ${inputClass} ${
              error ? "border-red-500" : ""
            }`}
            style={{ height: height }}
          ></textarea>

          {showAiButton && (
            <div>
              <ButtonComponent
                name="Thinking..."
                onClick={handleAiPopup}
                type="submit"
                variant="ai"
                className="mg-ai-button"
                iconRight={<SvgIcon name="Ai" width={20} height={20} />}
              />
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div
            className={`custom-helper-text ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default TextAreaComponent;
