import React from "react";
import "./Button.scss";

const ButtonComponent = ({
  name,
  onClick,
  type = "button",
  variant = "primary", // can be: primary | secondary | danger | custom
  disabled = false,
  fullWidth = false,
  icon = null, // optional icon JSX (left)
  iconRight = null, // optional icon JSX (right)
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${variant} ${
        fullWidth ? "full-width" : ""
      } ${className}`}
    >
      {icon && <span className="button-icon-left">{icon}</span>}
      {name}
      {iconRight && <span className="button-icon-right">{iconRight}</span>}
    </button>
  );
};

export default ButtonComponent;
