// hooks/usePasswordField.js
import { useState } from "react";

export const usePasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return { showPassword, togglePasswordVisibility };
};
