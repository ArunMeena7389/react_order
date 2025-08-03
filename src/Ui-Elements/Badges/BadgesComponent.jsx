import React, { Fragment } from "react";

const BadgesComponent = ({ variant = "primary", text = "", ...props }) => {
  if (!text) return null;

  return (
    <Fragment>
      <span className={`badge bg-${variant}`}>{text}</span>
    </Fragment>
  );
};

export default BadgesComponent;
