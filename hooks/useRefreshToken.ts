import axios from 'axios';
import { useRouter } from 'next/navigation';

const useRefreshToken = () => {
    const router = useRouter();

    let userInfo = {};

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
            try {
                userInfo = JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse userInfo from localStorage", e);
                userInfo = {};
            }
        }
    }

    const getRefreshToken = async () => {
        try {
            const response = await axios.get("/api/refresh");
            window.localStorage.setItem("userInfo", JSON.stringify({
                ...userInfo,
                accessToken: response.data.newAccessToken
            }));
            return response.data.newAccessToken;     
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null) {
                const err = error as { response?: { status?: number } };

                if (err.response?.status === 401) {
                    router.replace("/login");
                }
            }            
        }
    };

    return getRefreshToken;
}

export default useRefreshToken