import React from 'react';
import "./NotificationDropdown.css"
import { useNotifications } from "../../context/NotificationContext";
import NotificationList from '../../components/NotificationList/NotificationList';


const NotificationDropdown = () => {
    const { notifications, loading, error, markAsRead } = useNotifications();

    if (loading) {
        return <div>Loading notification...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="NotificationDropdownWrapper">
            <h2>Notification</h2>
            {notifications.length === 0 ? (
                <p>No new notification</p>
            ) : (
                <NotificationList notifications={notifications} markAsRead={markAsRead} />
            )}
        </div>
    );
};

export default NotificationDropdown;
