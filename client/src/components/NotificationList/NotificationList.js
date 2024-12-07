import React from 'react';
import "./NotificationList.css";

const NotificationList = ({ notifications, markAsRead }) => {
    const unreadNotificationExists = notifications.some(notification => !notification.read);

    return (
        <ul className="notificationUList">
            {notifications.map((notification) => (
                <li
                    key={notification.id}
                    onClick={() => markAsRead(notification._id)}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: notification.read ? '#f9f9f9' : '#e0f7fa',
                    }}
                >
                    <strong>{notification.title}</strong>
                    <p>{notification.message}</p>
                    {unreadNotificationExists && (
                        <span></span>
                    )}
                </li>
            ))}


        </ul>
    );
};

export default NotificationList;
