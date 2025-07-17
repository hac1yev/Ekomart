"use client";

import { Avatar, Box, Button, List, ListItemAvatar, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { memo } from "react";
import Image from "next/image";
import moment from "moment";
// import useAxiosPrivate from "@/hooks/useAxiosPrivate";
// import { useDispatch } from "react-redux";
import { useTypedNotificationSelector } from "@/store/notification-slice";
import noNotification from '../../public/images/no-notification.png';

const NotificationPopover = ({ id,open,anchorEl,onClose }: { id: string | undefined, open: boolean, anchorEl: HTMLDivElement | null, onClose: () => void }) => {
    const notifications = useTypedNotificationSelector((state) => state.notificationReducer.notifications);
    // const userInfo = {};
    // const axiosPrivate = useAxiosPrivate();
    // const dispatch = useDispatch();
    
    // const markAllRead = async () => {
    //     const notificationsIds = notifications.map((notification) => notification._id);
        
    //     try {
    //         await axiosPrivate.put("/api/notification", JSON.stringify({ ids: notificationsIds, userId: userInfo?.userId }), {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         // dispatch(notificationSliceActions.readAllNotification(userInfo?.userId));  
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };        
        

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
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
                        className="d-flex flex-col align-items-center justify-content-center" 
                        sx={{ 
                            width: '400px', 
                            bgcolor: 'background.paper',
                            px: 1, 
                            py: 4 
                        }}
                    >
                        <Image 
                            src={noNotification}
                            width={"230"}
                            height={"230"}
                            alt="logo"
                            priority
                        />
                        <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>No Notifications Yet!</Typography>
                        <Typography 
                            sx={{ 
                                fontSize: '14px',
                                width: '280px',
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
                        <Button variant="contained" sx={{ bgcolor: '#629d23', width: '80px', fontSize: '14px', color: '#fff', mt: 2, textTransform: 'capitalize' }} onClick={onClose}>Close</Button>
                    </Box>
                ) : (
                    <List 
                        className="notification-list"
                        sx={{ 
                            width: '100%', 
                            maxWidth: '400px', 
                            minWidth: '400px',  
                            bgcolor: 'background.paper', 
                            px: 1, 
                            py: 2 
                        }}
                    >
                        {notifications.toSorted((a,b) => {
                            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                            return dateB - dateA;
                        }).map((notification) => (
                            <ListItemButton sx={{ px: 1 }} key={notification.id}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#629d23' }}>
                                        <NotificationsActiveIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Box className="d-flex align-items-center justify-content-between" sx={{ gap: 1 }}>
                                        <Typography variant="h6" style={{ fontWeight: 600, fontSize: '14px' }}>{notification.title}</Typography>
                                        <Typography variant="subtitle1" style={{ fontSize: '12px', color: '#666' }}>{moment(notification.created_at).fromNow()}</Typography>
                                    </Box>
                                } secondary={
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: notification.description || "" }}
                                        style={{ fontSize: '12px' }}
                                    >
                                    </div>
                                } />
                            </ListItemButton>
                        ))}
                    </List>
                )}
                {notifications.length > 0 && <Box className="d-flex align-items-center justify-content-between" sx={{ width: '100%', px: 4, py: 1, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', bgcolor: '#f9f9f9' }}>
                    <Button sx={{ color: '#629d23', textTransform: 'capitalize', fontSize: '13px' }} onClick={onClose}>Cancel</Button>
                    <Button sx={{ color: '#629d23', textTransform: 'capitalize', fontSize: '13px' }}>Mark All Read</Button>
                </Box>}
            </Popover>
        </>
    );
};

export default memo(NotificationPopover);