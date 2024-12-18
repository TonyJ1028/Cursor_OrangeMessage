import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'screens/login_screen.dart';
import 'screens/chat_list_screen.dart';
import 'utils/theme.dart';
import 'controllers/auth_controller.dart';
import 'controllers/user_controller.dart';
import 'services/auth_service.dart';
import 'services/user_service.dart';
import 'services/socket_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  
  runApp(MyApp(prefs: prefs));
}

class MyApp extends StatelessWidget {
  final SharedPreferences prefs;

  const MyApp({super.key, required this.prefs});

  void _initializeServices() {
    // 初始化服务
    final authService = AuthService(prefs);
    final userService = UserService(prefs);
    final socketService = SocketService(prefs);

    // 初始化控制器
    Get.put(AuthController(prefs));
    Get.put(UserController(userService));
    Get.put(socketService);
  }

  @override
  Widget build(BuildContext context) {
    _initializeServices();

    return GetMaterialApp(
      title: '聊天应用',
      theme: AppTheme.lightTheme,
      home: prefs.containsKey('token') ? ChatListScreen() : LoginScreen(),
      getPages: [
        GetPage(name: '/login', page: () => LoginScreen()),
        GetPage(name: '/chat', page: () => ChatListScreen()),
      ],
      debugShowCheckedModeBanner: false,
    );
  }
}
