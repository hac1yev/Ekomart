import { socket } from "@/socket-client";
import { notificationSliceAction, useTypedNotificationSelector } from "@/store/notification-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import useUserInfo from "./useUserInfo";

const useNotification = () => {
    const notifications = useTypedNotificationSelector((state) => state.notificationReducer.notifications);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const user = useUserInfo();

    useEffect(() => {
        if(user?.accessToken) {
            (async function() {
                try {
                    const response = await axiosPrivate.get("/api/notification");
                    dispatch(notificationSliceAction.getAllNotifications(response.data.notifications));
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [axiosPrivate,user?.accessToken,dispatch]);

    useEffect(() => {
        const handleNotification = (data: NotificationObjType) => {
            dispatch(notificationSliceAction.addNotification(data));     
            console.log(data);
                   
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