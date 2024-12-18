class ChatModel {
  final String id;
  final String name;
  final String lastMessage;
  final String avatar;
  final String time;
  final int unreadCount;

  ChatModel({
    required this.id,
    required this.name,
    required this.lastMessage,
    required this.avatar,
    required this.time,
    required this.unreadCount,
  });

  // 模拟数据
  static List<ChatModel> getMockChats() {
    return [
      ChatModel(
        id: '1',
        name: '张三',
        lastMessage: '今天天气真不错！',
        avatar: 'https://ui-avatars.com/api/?name=张三&background=random',
        time: '09:30',
        unreadCount: 2,
      ),
      ChatModel(
        id: '2',
        name: '李四',
        lastMessage: '项目进展如何？',
        avatar: 'https://ui-avatars.com/api/?name=李四&background=random',
        time: '昨天',
        unreadCount: 0,
      ),
      ChatModel(
        id: '3',
        name: '王五',
        lastMessage: '周末一起打球吗？',
        avatar: 'https://ui-avatars.com/api/?name=王五&background=random',
        time: '星期二',
        unreadCount: 1,
      ),
    ];
  }
} 