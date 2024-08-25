export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const showNotification = (title, body) => {
  // Check if the browser supports notifications
  if ("Notification" in window) {
    // Request permission if not already granted
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  } else {
    console.log("Browser does not support notifications.");
  }
};
