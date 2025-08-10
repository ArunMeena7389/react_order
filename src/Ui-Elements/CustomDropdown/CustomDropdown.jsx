import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  triggerContent,
  items,
  width = "200px",
  maxHeight = "200px",
  position = "right", // "left" or "right"
  onSelect = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [dynamicPosition, setDynamicPosition] = useState(position);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Adjust position if overflow happens
  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      if (rect.right > windowWidth) {
        setDynamicPosition("right");
      } else {
        setDynamicPosition(position);
      }
    }
  }, [open, position]);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "inline-block",
        width: typeof triggerContent === "string" ? width : "auto",
      }}
    >
      {/* Trigger element */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        {triggerContent}
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            width,
            position: "absolute",
            top: "100%",
            [dynamicPosition]: 0, // dynamically sets left or right
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            borderRadius: "4px",
            marginTop: "4px",
            zIndex: 1000,
            maxHeight,
            overflowY: "auto", // scrollbar if content exceeds maxHeight
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom:
                  index !== items.length - 1 ? "1px solid #eee" : "none",
                color: "black",
                background: item.disabled ? "#f8f8f8" : "white",
                pointerEvents: item.disabled ? "none" : "auto",
              }}
              onClick={() => {
                if (!item.disabled) {
                  onSelect(item);
                  setOpen(false);
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
