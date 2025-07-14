import { socket } from "@/socket-client";
import { notificationSliceAction, useTypedNotificationSelector } from "@/store/notification-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useNotification = () => {
    const notifications = useTypedNotificationSelector((state) => state.notificationReducer.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNotification = (data: NotificationObjType) => {
            dispatch(notificationSliceAction.addNotification(data));                        
        };

        socket.on("sendChangePassword", handleNotification);
        socket.on("sendCartSale", handleNotification);

        return () => {
            socket.off("sendChangePassword", handleNotification);
            socket.off("sendCartSale", handleNotification);
        }
    }, [dispatch]);

    return {
        notifications
    }
};

export default useNotification;