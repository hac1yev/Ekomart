"use client"

import { store } from "@/store"
import { Provider } from "react-redux"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { socket } from '@/socket-client';

type Props = {
    children: React.ReactNode
}

const ProviderWrapper = ({ children }: Props) => {
    const user = useUserInfo();
    
    useEffect(() => {
        if(user?.userId) {
            socket.emit("newUser", user.userId);
        }
    }, [user?.userId]);

    return (
        <Provider store={store}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {children}
        </Provider>
    );
};

export default ProviderWrapper;