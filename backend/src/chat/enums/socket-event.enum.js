"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvent = void 0;
var SocketEvent;
(function (SocketEvent) {
    // 连接相关
    SocketEvent["CONNECT"] = "connect";
    SocketEvent["DISCONNECT"] = "disconnect";
    SocketEvent["ERROR"] = "error";
    // 聊天室相关
    SocketEvent["JOIN_ROOM"] = "joinRoom";
    SocketEvent["LEAVE_ROOM"] = "leaveRoom";
    SocketEvent["ROOM_JOINED"] = "roomJoined";
    SocketEvent["ROOM_LEFT"] = "roomLeft";
    // 消息相关
    SocketEvent["SEND_MESSAGE"] = "sendMessage";
    SocketEvent["NEW_MESSAGE"] = "newMessage";
    SocketEvent["MESSAGE_RECEIVED"] = "messageReceived";
    SocketEvent["MESSAGE_READ"] = "messageRead";
    SocketEvent["MARK_ALL_READ"] = "markAllMessagesAsRead";
    SocketEvent["ALL_MESSAGES_READ"] = "allMessagesRead";
    SocketEvent["GET_UNREAD_COUNT"] = "getUnreadCount";
    SocketEvent["UNREAD_COUNT"] = "unreadCount";
    // 用户状态相关
    SocketEvent["USER_TYPING"] = "userTyping";
    SocketEvent["USER_STOP_TYPING"] = "userStopTyping";
    SocketEvent["USER_STATUS"] = "userStatus";
    SocketEvent["USER_ONLINE"] = "userOnline";
    SocketEvent["USER_OFFLINE"] = "userOffline";
    // 错误相关
    SocketEvent["UNAUTHORIZED"] = "unauthorized";
    SocketEvent["FORBIDDEN"] = "forbidden";
    SocketEvent["NOT_FOUND"] = "notFound";
})(SocketEvent || (exports.SocketEvent = SocketEvent = {}));
