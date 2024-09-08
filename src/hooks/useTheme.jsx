import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Ensure the theme is applied correctly on initial load
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
