import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import { useAuth } from "./authContext";

// Create the Context for Notifications
export const NotificationContext = createContext();

// Provider component for Notifications
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth(); // Use the Auth context to get user data

    // Fetch notifications when the user is authenticated
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user || !user.id) {
                console.error("User is invalid", user);
                setError("User ID is missing or undefined");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${config.SERVER_URI}/notifications/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch notification: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Fetched notifications", data);

                setNotifications(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching notifications:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    // Mark as read function
    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`${config.SERVER_URI}/notifications/mark-as-read/${notificationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to mark notification as read: ${response.statusText}`);
            }

            // Update the notification locally after marking it as read
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification._id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, loading, error, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook to use Notification context
export const useNotifications = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }

    return context;
};
