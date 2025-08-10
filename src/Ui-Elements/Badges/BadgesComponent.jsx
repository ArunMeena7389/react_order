import React, { useEffect, useState } from "react";
import "./BadgesComponent.scss";

const BadgesComponent = ({
  variant = "primary",
  text = "",
  positionClass = "",
  NotificationCount = false,
}) => {
  const [textValue, setTextValue] = useState(text);
  useEffect(() => {
    setTextValue(text);
  }, [text]);
  if (!textValue) return null;

  return (
    <span
      className={`badge bg-${variant} ${positionClass} ${
        NotificationCount ? "mg-badge-count" : ""
      }`}
    >
      {textValue}
    </span>
  );
};

export default BadgesComponent;

/* <span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
<span class="badge badge-dark">Dark</span> */

// ai api key site
// https://dashboard.cohere.com/api-keys
