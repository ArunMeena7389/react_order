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


{/* <span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
<span class="badge badge-dark">Dark</span> */}
// ai api key site
// https://dashboard.cohere.com/api-keys