import { useState } from "react";
import PropTypes from "prop-types";

const useLoader = (initialLoaderState = false) => {
  const [loader, setLoader] = useState(initialLoaderState);

  const LoaderComponent = ({
    size = "md",
    color = "blue-500",
    type = "dots",
    text = "Loading...",
  }) => {
    const sizeClasses = {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
      xl: "h-5 w-5",
    };

    const loaderSize = sizeClasses[size] || sizeClasses.md;

    const renderLoader = () => {
      switch (type) {
        case "spinner":
          return (
            <div
              className={`h-12 w-12 rounded-full border-4 border-t-transparent border-r-${color} border-b-transparent border-l-${color} animate-spin`}
            />
          );
        case "dots":
          return (
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`${loaderSize} bg-${color} rounded-full`}
                  style={{
                    animation: `dotPulse 1.5s infinite ease-in-out ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          );
        case "pulse":
          return (
            <div
              className={`h-12 w-12 bg-${color} rounded-full animate-pulse`}
            />
          );
        default:
          return null;
      }
    };

    return (
      loader && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm z-50">
          {renderLoader()}
          {text && <p className={`mt-4 text-${color} font-semibold`}>{text}</p>}
        </div>
      )
    );
  };

  LoaderComponent.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    color: PropTypes.string,
    type: PropTypes.oneOf(["spinner", "dots", "pulse"]),
    text: PropTypes.string,
  };

  return [setLoader, LoaderComponent];
};

export default useLoader;
