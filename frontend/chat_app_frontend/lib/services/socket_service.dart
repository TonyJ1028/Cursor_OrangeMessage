import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../utils/constants.dart';

class SocketService extends GetxService {
  late IO.Socket socket;
  final SharedPreferences _prefs;

  SocketService(this._prefs) {
    _initSocket();
  }

  void _initSocket() {
    socket = IO.io(
      '${Constants.baseUrl}/chat',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .enableAutoConnect()
          .enableReconnection()
          .setAuth({'token': 'Bearer ${_prefs.getString('token')}'})
          .build(),
    );

    socket.onConnect((_) {
      print('Socket connected');
    });

    socket.onDisconnect((_) {
      print('Socket disconnected');
    });

    socket.onError((error) {
      print('Socket error: $error');
    });

    socket.onConnectError((error) {
      print('Socket connect error: $error');
    });
  }

  void joinRoom(String roomId) {
    socket.emit('joinRoom', {'roomId': roomId});
  }

  void leaveRoom(String roomId) {
    socket.emit('leaveRoom', {'roomId': roomId});
  }

  void sendMessage(String content, String chatRoomId) {
    socket.emit('sendMessage', {
      'content': content,
      'chatRoomId': chatRoomId,
    });
  }

  void sendTyping(String roomId, bool isTyping) {
    socket.emit('userTyping', {
      'roomId': roomId,
      'isTyping': isTyping,
    });
  }

  void markMessageAsRead(String messageId) {
    socket.emit('messageRead', {'messageId': messageId});
  }

  void markAllMessagesAsRead(String chatRoomId) {
    socket.emit('markAllMessagesAsRead', {'chatRoomId': chatRoomId});
  }

  void getUnreadCount() {
    socket.emit('getUnreadCount');
  }

  void dispose() {
    socket.dispose();
  }
} 