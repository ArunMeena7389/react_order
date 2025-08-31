import React, { useRef } from "react";
// import { FaUpload } from "react-icons/fa";
import PropTypes from "prop-types";
import "./ImageUploader.scss";

const ImageUploader = ({
  image,
  onChange,
  size = 150,
  required = false,
  errorMessage = "Image is required",
}) => {
  const fileInputRef = useRef(null);
  const showError = required;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result, file); // return both base64 + file object
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex flex-column align-items-start">
      <div
        className={`image-uploader d-flex align-items-center justify-content-center 
          ${showError ? "is-invalid" : ""}`}
        style={{ width: size + 10, height: size }}
        onClick={handleClick}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="uploaded-image"
            style={{ width: size + 10, height: size }}
          />
        ) : (
          <div className="upload-placeholder">
            {/* <FaUpload size={30} className="text-muted" /> */}
            <p className="text-muted mb-0">Upload</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="d-none"
          onChange={handleFileChange}
        />
      </div>

      {showError && (
        <div className="invalid-feedback d-block">{errorMessage}</div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default ImageUploader;
