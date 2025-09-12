import React, { useEffect, useState } from "react";
import "./BadgesComponent.scss"; // keep if you have custom CSS overrides

// Tailwind variant mappings
const badgeVariants = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-500 text-white",
  success: "bg-green-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-400 text-black",
  info: "bg-sky-500 text-white",
  light: "bg-gray-200 text-black",
  dark: "bg-gray-800 text-white",
};

const BadgesComponent = ({
  variant = "primary",
  text = "",
  positionClass = "",
  NotificationCount = false,
  customClass = "",
  onClick,
  title,
}) => {
  const [textValue, setTextValue] = useState(text);

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  if (!textValue) return null;

  return (
    <span
      title={title}
      onClick={onClick}
      className={`inline-block rounded px-2 py-1 text-xs font-medium 
        ${badgeVariants[variant] || badgeVariants.primary} 
        ${customClass} ${positionClass} 
        ${NotificationCount ? "mg-badge-count" : ""}`}
    >
      {textValue}
    </span>
  );
};

export default BadgesComponent;
