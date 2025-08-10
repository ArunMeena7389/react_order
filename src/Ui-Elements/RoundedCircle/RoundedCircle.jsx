import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Common Rounded Circle Avatar Component
 *
 * Props:
 * - size: number (diameter in pixels)
 * - content: string | JSX (text initials, HTML, image tag)
 * - bgColor: string (Bootstrap color class or custom)
 * - textColor: string (Bootstrap color class or custom)
 */
const RoundedCircle = ({
  size = 50,
  content = "AM",
  bgColor = "bg-success",
  textColor = "text-white",
}) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 2.5}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={`rounded-circle ${bgColor} ${textColor}`} style={style}>
      {typeof content === "string" ? (
        <span className="fw-bold">{content}</span>
      ) : (
        content
      )}
    </div>
  );
};

RoundedCircle.propTypes = {
  size: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default RoundedCircle;
