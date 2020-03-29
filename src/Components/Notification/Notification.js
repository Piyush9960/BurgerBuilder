// import React from "react";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

export const Notification = (type, message) => {
  switch (type) {
    case "info":
      return NotificationManager.info("Info message");

    case "success":
      console.log("In success notification..");
      return NotificationManager.success(message, "Congradulations!", 4000);

    case "warning":
      return NotificationManager.warning(
        "Warning message",
        "Close after 3000ms",
        3000
      );

    case "error":
      return NotificationManager.error(
        "Error message",
        "Click me!",
        5000,
        () => {
          alert("callback");
        }
      );
    default:
      return "";
  }
};

// export default Notification;
