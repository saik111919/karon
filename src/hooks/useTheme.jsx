// src/hooks/useTheme.js

import { useEffect, useState } from "react";

const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkTheme
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-900";
    sessionStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return [isDarkTheme, toggleTheme];
};

export default useTheme;
