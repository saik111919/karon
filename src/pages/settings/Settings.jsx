import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import HoverableName from "./HoverableName";
import Logout from "../../plugin/Logout";
import AlertModal from "../../component/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

const SidebarItem = ({ icon, title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
      active
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
        : "hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </button>
);

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SettingsItem = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h2>
    <div className="dark:bg-gray-800 rounded-lg shadow">{children}</div>
  </div>
);

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [activeSection, setActiveSection] = useState("account");

  const handleNameChange = (newName) => {
    setName(newName);
    localStorage.setItem("name", newName);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <SettingsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 dark:bg-gray-800 rounded-lg shadow">
            <SidebarItem
              icon={<User className="h-5 w-5" />}
              title="Account"
              active={activeSection === "account"}
              onClick={() => setActiveSection("account")}
            />
            <SidebarItem
              icon={<Bell className="h-5 w-5" />}
              title="Notifications"
              active={activeSection === "notifications"}
              onClick={() => setActiveSection("notifications")}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeSection === "account" && (
              <>
                <SettingsItem title="Profile">
                  <div className="p-4">
                    <HoverableName
                      name={name}
                      onNameChange={handleNameChange}
                      className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </SettingsItem>

                <SettingsItem title="Appearance">
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className="w-full flex items-center justify-between rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-500" />
                      )}
                      <span className="text-sm font-medium">
                        {theme === "dark"
                          ? "Switch to light mode"
                          : "Switch to dark mode"}
                      </span>
                    </div>
                  </button>
                </SettingsItem>

                <SettingsItem title="Account Actions">
                  <Logout
                    tag="button"
                    className="w-full flex items-center justify-between p-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 transition-colors duration-200"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    <span className="text-sm font-medium">Log out</span>
                    <LogOut className="h-5 w-5" />
                  </Logout>
                </SettingsItem>
              </>
            )}

            {activeSection === "notifications" && (
              <SettingsItem title="Notifications">
                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Notification settings will be displayed here.
                  </p>
                </div>
              </SettingsItem>
            )}
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        type="warning"
        confirmText="Yes, log out"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Settings;
