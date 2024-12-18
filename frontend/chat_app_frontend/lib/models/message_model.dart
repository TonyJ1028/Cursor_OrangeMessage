class MessageModel {
  final String id;
  final String content;
  final String senderId;
  final String time;
  final bool isMe;
  final MessageType type;
  final MessageStatus status;

  MessageModel({
    required this.id,
    required this.content,
    required this.senderId,
    required this.time,
    required this.isMe,
    this.type = MessageType.text,
    this.status = MessageStatus.sent,
  });

  // 模拟数据
  static List<MessageModel> getMockMessages() {
    return [
      MessageModel(
        id: '1',
        content: '你好！',
        senderId: '1',
        time: '09:30',
        isMe: true,
      ),
      MessageModel(
        id: '2',
        content: '你好啊！最近怎么样？',
        senderId: '2',
        time: '09:31',
        isMe: false,
      ),
      MessageModel(
        id: '3',
        content: '还不错，最近在忙一个新项目',
        senderId: '1',
        time: '09:32',
        isMe: true,
      ),
      MessageModel(
        id: '4',
        content: '听起来很有趣，能说说是什么项目吗？',
        senderId: '2',
        time: '09:33',
        isMe: false,
      ),
      MessageModel(
        id: '5',
        content: '是一个聊天应用，正在开发中...',
        senderId: '1',
        time: '09:34',
        isMe: true,
      ),
    ];
  }
}

enum MessageType {
  text,
  image,
  file,
  voice,
}

enum MessageStatus {
  sending,
  sent,
  delivered,
  read,
  failed,
} 