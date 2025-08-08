// CustomFallbackUi.jsx
import { useEffect } from "react";
import { showCustomLoader } from "./showCustomLoader";

const CustomFallbackUi = () => {
  useEffect(() => {
    showCustomLoader(true); // Show on mount
    return () => showCustomLoader(false); // Hide on unmount
  }, []);

  return null; // No visible fallback needed here
};

export default CustomFallbackUi;
