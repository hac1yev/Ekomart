"use client";

import { Avatar, Box, Button, List, ListItemAvatar, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { memo, useCallback, useState } from "react";
import Image from "next/image";
import moment from "moment";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";

const NotificationPopover = () => {
    const notifications = [];
    const userInfo = {};
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleNotificationPopoverOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
    const handleNotificationPopoverClose = useCallback(() => setAnchorEl(null), []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const markAllRead = async () => {
        const notificationsIds = notifications.map((notification) => notification._id);
        
        try {
            await axiosPrivate.put("/api/notification", JSON.stringify({ ids: notificationsIds, userId: userInfo?.userId }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // dispatch(notificationSliceActions.readAllNotification(userInfo?.userId));  
        } catch (error) {
            console.log(error);
        }
    };        

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleNotificationPopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {notifications.length === 0 ? (
                    <Box 
                        className="flex-column-center" 
                        sx={{ 
                            width: '360px', 
                            bgcolor: 'background.paper',
                            px: 1, 
                            py: 4 
                        }}
                    >
                        <Image 
                            src={"/no-notification.jpg"}
                            width={"230"}
                            height={"230"}
                            alt="logo"
                            priority
                        />
                        <Typography variant="h5">No Notifications Yet!</Typography>
                        <Typography 
                            sx={{ 
                                fontSize: '16px',
                                fontWeight: '400',
                                lineHeight: '18px',
                                color: '#9D9D9B',
                                textAlign: 'center',
                                px: 2,
                                mt: 1
                            }}
                        >
                            You have no notifications right now. Come back later.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ color: '#fff', mt: 2, textTransform: 'capitalize' }} onClick={handleNotificationPopoverClose}>Close</Button>
                    </Box>
                ) : (
                    <List 
                        className="notification-list"
                        sx={{ 
                            width: '100%', 
                            maxWidth: '460px', 
                            minWidth: '260px',  
                            bgcolor: 'background.paper', 
                            px: 1, 
                            py: 2 
                        }}
                    >
                        {notifications.toSorted((a,b) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            return dateB - dateA;
                        }).map((notification) => (
                            <ListItemButton sx={{ px: 1 }} key={notification._id}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        <NotificationsActiveIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Box className="flex-start" sx={{ gap: 1 }}>
                                        <Typography variant="h6">{notification.type}</Typography>
                                        <Typography variant="subtitle1">{moment(notification.createdAt).fromNow()}</Typography>
                                    </Box>
                                } secondary={
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: notification.message || "" }}
                                    >
                                    </div>
                                } />
                            </ListItemButton>
                        ))}
                    </List>
                )}
                {notifications.length > 0 && <Box className="flex-between" sx={{ width: '100%', px: 4, py: 1, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', bgcolor: '#f9f9f9' }}>
                    <Button sx={{ textTransform: 'capitalize' }} onClick={handleNotificationPopoverClose}>Cancel</Button>
                    <Button sx={{ textTransform: 'capitalize' }} onClick={markAllRead}>Mark All Read</Button>
                </Box>}
            </Popover>
        </>
    );
};

export default memo(NotificationPopover);