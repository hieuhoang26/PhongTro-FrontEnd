import React, { useContext, useEffect, useState } from "react";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "./notificationSocket";
import { AuthContext } from "../../context/AuthContext";

export const Notification = () => {
  const { userId } = useContext(AuthContext);

  console.log(userId);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userId) {
      connectNotificationSocket(userId, (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
      });
      return () => disconnectNotificationSocket();
    }
  }, [userId]);

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
            {notifications.length}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded">
        {notifications.map((n, i) => (
          <div key={i} className="p-2 border-b">
            <strong>{n.title}</strong>
            <p className="text-sm">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
