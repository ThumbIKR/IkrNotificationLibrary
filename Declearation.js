//Initialization
$("#noti_Container").ikrNotificationSetup();

//Declaration
$("#noti_Container").ikrNotificationCount({
    NotificationList: notifications,
    NotiFromPropName: "FromUserName",
    ListTitlePropName: "NotiHeader",
    ListBodyPropName: "NotiBody",
    ControllerName: "Notifications",
    ActionName: "AllNotifications"
});