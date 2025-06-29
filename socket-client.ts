"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NODE_ENV === 'production' ? process.env.SOCKET_IO_SERVER : 'http://localhost:4000');