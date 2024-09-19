import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import PropTypes from "prop-types";

const updateUserDetails = async (data) => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { name: data.name, message: "Name updated successfully" },
      });
    }, 1000);
  });
};

const HoverableName = ({ name = "Default Name", onNameChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formName, setFormName] = useState(name);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await updateUserDetails({ name: formName });
      onNameChange(result.data.name);
      localStorage.setItem("name", result.data.name);
      setIsDialogOpen(false);
      setToast({ type: "success", message: result.data.message });
    } catch (error) {
      setToast({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white dark:bg-opacity-90`}
        >
          {toast.message}
        </div>
      )}

      <div
        className="relative inline-block text-2xl font-medium text-gray-900 dark:text-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
        {isHovered && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="ml-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 h-screen w-screen bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Edit Name
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-md transition duration-200 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HoverableName.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func,
};

export default HoverableName;
