"use client";
import { useEffect } from "react";

const NotificationPermissionHandler = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ("Notification" in window) {
        if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.log("Notification permission denied.");
          }
        } else if (Notification.permission === "denied") {
          console.log("Notifications are disabled.");
        }
      }
    };

    requestNotificationPermission();
  }, []);

  return null;
};

export default NotificationPermissionHandler;
