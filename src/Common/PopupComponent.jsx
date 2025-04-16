import React, { Fragment } from 'react';


const PopupComponent = ({
    title = "Delete",
    description = "Are sure you want to delete this item ? 🗑️",
    onClick,
    onClose,
    ...props }) => {

    return (
        <Fragment>
            <div className="modal show fade d-block custom-backdrop " tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content bg-dark">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title text-light">{title}</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                aria-label="Close"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    boxShadow: 'none',
                                  }}
                                onClick={() => onClick(false)}
                            ></button>
                        </div>
                        <div className="modal-body text-light">
                            <p>{description}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => onClose(false)}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => onClick(true)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PopupComponent;
