import React from "react";
import PropTypes from "prop-types";

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
    <div className={`rounded-full ${bgColor} ${textColor}`} style={style}>
      {typeof content === "string" ? (
        <span className="font-bold">{content}</span>
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
