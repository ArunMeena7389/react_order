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
    <div className="flex flex-col items-start">
      <div
        className={`image-uploader flex items-center justify-center 
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
            {/* <FaUpload size={30} className="text-gray-500" /> */}
            <p className="text-gray-500 m-0">Upload</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {showError && <div className="text-red-500 text-sm">{errorMessage}</div>}
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
