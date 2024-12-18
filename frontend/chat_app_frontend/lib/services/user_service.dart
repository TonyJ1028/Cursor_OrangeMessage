import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import 'http_service.dart';

class UserService extends HttpService {
  UserService(SharedPreferences prefs) : super(prefs);

  Future<List<UserModel>> searchUsers(String query) async {
    final response = await get('/users/search?query=$query');

    if (response.status.hasError) {
      throw response.statusText ?? '搜索用户失败';
    }

    return (response.body as List)
        .map((user) => UserModel.fromJson(user))
        .toList();
  }

  Future<void> addContact(String userId) async {
    final response = await post('/users/contacts', {'userId': userId});

    if (response.status.hasError) {
      throw response.statusText ?? '添加联系人失败';
    }
  }

  Future<List<UserModel>> getContacts() async {
    final response = await get('/users/contacts');

    if (response.status.hasError) {
      throw response.statusText ?? '获取联系人列表失败';
    }

    return (response.body as List)
        .map((user) => UserModel.fromJson(user))
        .toList();
  }

  Future<void> updateProfile(Map<String, dynamic> data) async {
    final response = await put('/users/profile', data);

    if (response.status.hasError) {
      throw response.statusText ?? '更新个人资料失败';
    }
  }

  Future<void> updateAvatar(String filePath) async {
    final form = FormData({
      'avatar': MultipartFile(filePath, filename: 'avatar.jpg'),
    });

    final response = await post('/users/avatar', form);

    if (response.status.hasError) {
      throw response.statusText ?? '更新头像失败';
    }
  }
} 