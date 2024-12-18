import 'package:get/get.dart';
import '../services/user_service.dart';
import '../models/user_model.dart';

class UserController extends GetxController {
  final UserService _userService;
  final _searchResults = <UserModel>[].obs;
  final _contacts = <UserModel>[].obs;
  final _isLoading = false.obs;

  UserController(this._userService);

  List<UserModel> get searchResults => _searchResults;
  List<UserModel> get contacts => _contacts;
  bool get isLoading => _isLoading.value;

  Future<void> searchUsers(String query) async {
    try {
      _isLoading.value = true;
      final results = await _userService.searchUsers(query);
      _searchResults.assignAll(results);
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> addContact(String userId) async {
    try {
      _isLoading.value = true;
      await _userService.addContact(userId);
      await loadContacts();
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> loadContacts() async {
    try {
      _isLoading.value = true;
      final contacts = await _userService.getContacts();
      _contacts.assignAll(contacts);
    } finally {
      _isLoading.value = false;
    }
  }

  Future<void> updateProfile(Map<String, dynamic> data) async {
    try {
      _isLoading.value = true;
      await _userService.updateProfile(data);
    } finally {
      _isLoading.value = false;
    }
  }

  @override
  void onInit() {
    super.onInit();
    loadContacts();
  }
} 