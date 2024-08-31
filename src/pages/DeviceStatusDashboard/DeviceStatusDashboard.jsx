import { useState, useEffect } from "react";
import {
  FaBatteryHalf,
  FaBatteryFull,
  FaBatteryEmpty,
  FaWifi,
  FaExclamationTriangle,
} from "react-icons/fa";

const DeviceStatusDashboard = () => {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [networkType, setNetworkType] = useState("unknown");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Battery API
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBatteryStatus = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
          setIsCharging(battery.charging);
        };

        updateBatteryStatus();
        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);

        return () => {
          battery.removeEventListener("levelchange", updateBatteryStatus);
          battery.removeEventListener("chargingchange", updateBatteryStatus);
        };
      });
    }

    // Network Information API
    if ("connection" in navigator) {
      const connection = navigator.connection;
      const updateNetworkStatus = () => {
        setNetworkType(connection.effectiveType);
      };

      updateNetworkStatus();
      connection.addEventListener("change", updateNetworkStatus);

      return () => {
        connection.removeEventListener("change", updateNetworkStatus);
      };
    }

    // Online/Offline Status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Function to select appropriate battery icon based on level
  const getBatteryIcon = () => {
    if (batteryLevel > 75) return <FaBatteryFull />;
    if (batteryLevel > 25) return <FaBatteryHalf />;
    return <FaBatteryEmpty />;
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl shadow-xl text-gray-100 relative overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-500">
        Device Status
      </h1>

      <div className="space-y-6">
        {/* Battery Status */}
        <div
          className="bg-gray-700 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-xl transition-transform transform hover:scale-105"
          role="region"
          aria-label="Battery Status"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl text-purple-400" aria-hidden="true">
                {getBatteryIcon()}
              </div>
              <span className="text-xl font-semibold">Battery</span>
            </div>
            <div className="text-xl font-semibold">
              {batteryLevel}%
              {isCharging && (
                <span className="ml-2 text-green-400">(Charging)</span>
              )}
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-600 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                isCharging ? "bg-green-400" : "bg-purple-400"
              }`}
              style={{ width: `${batteryLevel}%` }}
              aria-valuenow={batteryLevel}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        </div>

        {/* Network Status */}
        <div
          className="bg-gray-700 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-xl transition-transform transform hover:scale-105"
          role="region"
          aria-label="Network Status"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl text-purple-400" aria-hidden="true">
                {isOnline ? <FaWifi /> : <FaExclamationTriangle />}
              </div>
              <span className="text-xl font-semibold">Network</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
              aria-label={`Network is currently ${
                isOnline ? "online" : "offline"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
          {isOnline && (
            <div className="mt-4 text-md">
              <span className="font-medium">Connection:</span> {networkType}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements for Modern Look */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default DeviceStatusDashboard;
