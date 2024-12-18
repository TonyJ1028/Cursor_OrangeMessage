import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/constants.dart';

class HttpService extends GetConnect {
  final SharedPreferences _prefs;

  HttpService(this._prefs) {
    httpClient.baseUrl = Constants.baseUrl;
    httpClient.addAuthenticator<dynamic>((request) async {
      final token = _prefs.getString('token');
      if (token != null) {
        request.headers['Authorization'] = 'Bearer $token';
      }
      return request;
    });

    httpClient.addResponseModifier((request, response) {
      if (response.statusCode == 401) {
        _prefs.remove('token');
        Get.offAllNamed('/login');
      }
      return response;
    });
  }
} 