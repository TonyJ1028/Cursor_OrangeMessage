import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/auth_service.dart';
import '../models/user_model.dart';

class AuthController extends GetxController {
  final AuthService _authService;
  final _user = Rx<UserModel?>(null);
  final _isLoading = false.obs;

  AuthController(SharedPreferences prefs)
      : _authService = AuthService(prefs);

  UserModel? get user => _user.value;
  bool get isLoading => _isLoading.value;
  bool get isAuthenticated => _authService.isAuthenticated();

  Future<void> login(String email, String password) async {
    try {
      _isLoading.value = true;
      final userData = await _authService.login(email, password);
      _user.value = UserModel(
        id: userData['id'],
        name: userData['name'],
        email: userData['email'],
        avatar: userData['avatar'],
        bio: userData['bio'],
        phone: userData['phone'],
        isOnline: true,
        lastSeen: DateTime.now(),
      );
      Get.offAllNamed('/chat');
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> register(String name, String email, String password) async {
    try {
      _isLoading.value = true;
      await _authService.register(name, email, password);
      await login(email, password);
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> logout() async {
    try {
      _isLoading.value = true;
      await _authService.logout();
      _user.value = null;
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> loadProfile() async {
    if (!isAuthenticated) return;

    try {
      _isLoading.value = true;
      final userData = await _authService.getProfile();
      _user.value = UserModel(
        id: userData['id'],
        name: userData['name'],
        email: userData['email'],
        avatar: userData['avatar'],
        bio: userData['bio'],
        phone: userData['phone'],
        isOnline: true,
        lastSeen: DateTime.now(),
      );
    } finally {
      _isLoading.value = false;
    }
  }

  @override
  void onInit() {
    super.onInit();
    loadProfile();
  }
} 