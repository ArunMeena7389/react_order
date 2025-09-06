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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 custom-backdrop"
        tabIndex="-1"
        role="dialog"
      >
        <div
          className={`relative ${className}`}
          role="document"
          style={{ maxWidth: width, width: "100%" }}
        >
          <div
            className="bg-white rounded-lg shadow-lg flex flex-col w-full"
            style={{ height: height, maxHeight: "90vh" }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              {title && <h5 className="text-lg font-semibold">{title}</h5>}
              {showCloseIcon && (
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="p-4 overflow-y-auto">{content}</div>

            {footer && (
              <div className="flex justify-end gap-2 p-4 border-t">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopupComponent;
