import React from 'react';
import { useNotifications } from '../../context/NotificationContext'; // Import the Notification context
import NotificationList from '../../components/NotificationList/NotificationList';

const Notification = () => {
    const { notifications, loading, error, markAsRead } = useNotifications(); // Get notifications from context



    if (loading) {
        return <div>Loading notifications...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if there's an issue fetching notifications
    }

    return (
        <div style={{
            width: "100%",
            paddingTop: "110px",
            paddingLeft: "5px",
            paddingRight: "5px",
        }}>
            <h2 style={{
                fontSize: "24px",
                color: "#333",
                marginBottom: "10px",
                paddingLeft: "10px",
            }}>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No new notifications.</p> // If no notifications are available
            ) : (
                <NotificationList notifications={notifications} markAsRead={markAsRead} />
            )}
        </div>
    );
};

export default Notification;
