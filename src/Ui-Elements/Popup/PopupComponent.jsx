import React, { Fragment } from "react";
import "./PopupComponent.scss"; // for consistent styling

const PopupComponent = ({
  isOpen = false,
  onClose = () => {},
  title = "",
  content = null,
  footer = null,
  width = "900px",
  height = "auto",
  showCloseIcon = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      <div
        className="modal show fade d-block custom-backdrop"
        tabIndex="-1"
        role="dialog"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${className}`}
          role="document"
          style={{ maxWidth: width }}
        >
          <div className="modal-content" style={{ height }}>
            <div className="modal-header justify-content-between">
              {title && <h5 className="modal-title">{title}</h5>}
              {showCloseIcon && (
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                ></button>
              )}
            </div>

            <div className="modal-body ">{content}</div>

            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopupComponent;
