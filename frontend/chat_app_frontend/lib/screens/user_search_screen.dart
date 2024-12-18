import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/user_controller.dart';
import '../models/user_model.dart';
import '../utils/theme.dart';

class UserSearchScreen extends StatelessWidget {
  final TextEditingController _searchController = TextEditingController();
  final UserController _userController = Get.find<UserController>();

  UserSearchScreen({super.key});

  void _handleSearch(String query) {
    if (query.isEmpty) return;
    _userController.searchUsers(query);
  }

  void _handleAddContact(String userId) async {
    try {
      await _userController.addContact(userId);
      Get.snackbar(
        '成功',
        '已添加联系人',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppTheme.success,
        colorText: AppTheme.white,
      );
    } catch (e) {
      Get.snackbar(
        '错误',
        e.toString(),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppTheme.danger,
        colorText: AppTheme.white,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('添加联系人'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: '搜索用户...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
              onChanged: _handleSearch,
            ),
          ),
          Expanded(
            child: Obx(() {
              if (_userController.isLoading) {
                return const Center(child: CircularProgressIndicator());
              }

              if (_userController.searchResults.isEmpty) {
                return const Center(
                  child: Text('没有找到用户'),
                );
              }

              return ListView.builder(
                itemCount: _userController.searchResults.length,
                itemBuilder: (context, index) {
                  final user = _userController.searchResults[index];
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: AppTheme.primary,
                      child: Text(
                        user.name.substring(0, 1),
                        style: const TextStyle(
                          color: AppTheme.white,
                          fontSize: 16,
                        ),
                      ),
                    ),
                    title: Text(user.name),
                    subtitle: Text(user.email),
                    trailing: IconButton(
                      icon: const Icon(Icons.person_add),
                      onPressed: () => _handleAddContact(user.id),
                    ),
                  );
                },
              );
            }),
          ),
        ],
      ),
    );
  }
} 