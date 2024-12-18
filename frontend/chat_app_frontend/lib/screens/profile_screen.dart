import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';
import '../utils/theme.dart';

class ProfileScreen extends StatelessWidget {
  final AuthController _authController = Get.find<AuthController>();

  ProfileScreen({super.key});

  void _handleLogout() async {
    try {
      await _authController.logout();
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
        title: const Text('个人资料'),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              // TODO: 实现编辑功能
            },
          ),
        ],
      ),
      body: Obx(() {
        final user = _authController.user;
        if (user == null) return const Center(child: CircularProgressIndicator());

        return SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 32),
                color: AppTheme.primary,
                child: Center(
                  child: Column(
                    children: [
                      CircleAvatar(
                        radius: 50,
                        backgroundColor: AppTheme.white,
                        child: Text(
                          user.name.substring(0, 1),
                          style: const TextStyle(
                            fontSize: 36,
                            color: AppTheme.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        user.name,
                        style: const TextStyle(
                          fontSize: 24,
                          color: AppTheme.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: AppTheme.success,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: const Text(
                          '在线',
                          style: TextStyle(
                            color: AppTheme.white,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              _buildInfoSection(
                title: '个人信息',
                items: [
                  _InfoItem(
                    icon: Icons.email_outlined,
                    title: '邮箱',
                    content: user.email,
                  ),
                  if (user.phone != null)
                    _InfoItem(
                      icon: Icons.phone_outlined,
                      title: '手机',
                      content: user.phone!,
                    ),
                  if (user.bio != null)
                    _InfoItem(
                      icon: Icons.info_outline,
                      title: '简介',
                      content: user.bio!,
                    ),
                ],
              ),
              const SizedBox(height: 16),
              _buildInfoSection(
                title: '设置',
                items: [
                  _InfoItem(
                    icon: Icons.notifications_outlined,
                    title: '消息通知',
                    onTap: () {
                      // TODO: 跳转到通知设置页面
                    },
                  ),
                  _InfoItem(
                    icon: Icons.security_outlined,
                    title: '隐私设置',
                    onTap: () {
                      // TODO: 跳转到隐私设置页面
                    },
                  ),
                  _InfoItem(
                    icon: Icons.color_lens_outlined,
                    title: '主题设置',
                    onTap: () {
                      // TODO: 跳转到主题设置页面
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Obx(() => ElevatedButton(
                      onPressed:
                          _authController.isLoading ? null : _handleLogout,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.danger,
                        minimumSize: const Size(double.infinity, 48),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: _authController.isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                valueColor:
                                    AlwaysStoppedAnimation<Color>(AppTheme.white),
                              ),
                            )
                          : const Text(
                              '退出登录',
                              style: TextStyle(
                                color: AppTheme.white,
                                fontSize: 16,
                              ),
                            ),
                    )),
              ),
              const SizedBox(height: 32),
            ],
          ),
        );
      }),
    );
  }

  Widget _buildInfoSection({
    required String title,
    required List<_InfoItem> items,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppTheme.dark,
            ),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            color: AppTheme.white,
            border: Border(
              top: BorderSide(color: AppTheme.light),
              bottom: BorderSide(color: AppTheme.light),
            ),
          ),
          child: Column(
            children: items,
          ),
        ),
      ],
    );
  }
}

class _InfoItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? content;
  final VoidCallback? onTap;

  const _InfoItem({
    required this.icon,
    required this.title,
    this.content,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 12,
        ),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: AppTheme.light,
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: AppTheme.secondary,
              size: 20,
            ),
            const SizedBox(width: 12),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                color: AppTheme.dark,
              ),
            ),
            const Spacer(),
            if (content != null)
              Expanded(
                child: Text(
                  content!,
                  textAlign: TextAlign.right,
                  style: TextStyle(
                    fontSize: 16,
                    color: AppTheme.secondary,
                  ),
                ),
              )
            else
              Icon(
                Icons.chevron_right,
                color: AppTheme.secondary,
                size: 20,
              ),
          ],
        ),
      ),
    );
  }
} 