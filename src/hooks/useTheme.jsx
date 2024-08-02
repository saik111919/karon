import { useEffect, useState } from "react";

const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const storedTheme = sessionStorage.getItem("theme");
    return storedTheme ? storedTheme === "dark" : true;
  });

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
