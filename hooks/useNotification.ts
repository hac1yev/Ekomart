import { socket } from "@/socket-client";
import { notificationSliceAction, useTypedNotificationSelector } from "@/store/notification-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useNotification = () => {
    const dispatch = useDispatch();
    const notifications = useTypedNotificationSelector((state) => state.notificationReducer.notifications);

    useEffect(() => {
        const handleNotification = ({userId}: { userId: number }) => {
            dispatch(notificationSliceAction.addNotification(userId.toString()));
        };

        socket.on("sendSomething", handleNotification);

        return () => {
            socket.off("sendSomething", handleNotification);
        }
    });

    return {
        notifications
    }
};

export default useNotification;