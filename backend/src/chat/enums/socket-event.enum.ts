export enum SocketEvent {
  // 连接相关
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',

  // 聊天室相关
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  ROOM_JOINED = 'roomJoined',
  ROOM_LEFT = 'roomLeft',

  // 消息相关
  SEND_MESSAGE = 'sendMessage',
  NEW_MESSAGE = 'newMessage',
  MESSAGE_RECEIVED = 'messageReceived',
  MESSAGE_READ = 'messageRead',
  MARK_ALL_READ = 'markAllMessagesAsRead',
  ALL_MESSAGES_READ = 'allMessagesRead',
  GET_UNREAD_COUNT = 'getUnreadCount',
  UNREAD_COUNT = 'unreadCount',

  // 用户状态相关
  USER_TYPING = 'userTyping',
  USER_STOP_TYPING = 'userStopTyping',
  USER_STATUS = 'userStatus',
  USER_ONLINE = 'userOnline',
  USER_OFFLINE = 'userOffline',

  // 错误相关
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'notFound',
} 