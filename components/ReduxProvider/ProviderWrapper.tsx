"use client"

import { store } from "@/store"
import { Provider } from "react-redux"
import { Toaster } from 'react-hot-toast';

type Props = {
    children: React.ReactNode
}

const ProviderWrapper = ({ children }: Props) => {
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