import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type NotificationStateType = {
    notifications: NotificationObjType[]
}

const initialNotificationState: NotificationStateType = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: initialNotificationState,
    reducers: {
        getAllNotifications(state,action) {
            state.notifications = action.payload;
        },
        addNotification(state,action) {
            state.notifications = [
                ...state.notifications,
                { ...action.payload }
            ]
        },
    }
});

export default notificationSlice;
export const notificationSliceAction = notificationSlice.actions;
export const useTypedNotificationSelector: TypedUseSelectorHook<{ notificationReducer: NotificationStateType }> = useSelector;