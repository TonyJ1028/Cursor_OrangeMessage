import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'http_service.dart';

class AuthService extends HttpService {
  AuthService(SharedPreferences prefs) : super(prefs);

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await post('/auth/login', {
      'email': email,
      'password': password,
    });

    if (response.status.hasError) {
      throw response.statusText ?? '登录失败';
    }

    final token = response.body['access_token'];
    final user = response.body['user'];
    await _prefs.setString('token', token);
    return user;
  }

  Future<void> register(String name, String email, String password) async {
    final response = await post('/users', {
      'name': name,
      'email': email,
      'password': password,
    });

    if (response.status.hasError) {
      throw response.statusText ?? '注册失败';
    }
  }

  Future<void> logout() async {
    try {
      await post('/auth/logout', {});
    } finally {
      await _prefs.remove('token');
      Get.offAllNamed('/login');
    }
  }

  Future<Map<String, dynamic>> getProfile() async {
    final response = await get('/users/profile');

    if (response.status.hasError) {
      throw response.statusText ?? '获取用户信息失败';
    }

    return response.body;
  }

  bool isAuthenticated() {
    return _prefs.containsKey('token');
  }
} 