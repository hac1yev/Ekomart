"use client";

import { useEffect, useState } from "react";

type UserInfo = {
  [key: string]: string | number;
};

export default function useUserInfo(): UserInfo | null {
  const [user, setUser] = useState<UserInfo>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return user;
}