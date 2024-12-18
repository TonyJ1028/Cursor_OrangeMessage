import 'package:flutter/material.dart';

class AppTheme {
  static const Color primary = Color(0xFF2B65F6);
  static const Color secondary = Color(0xFF6C757D);
  static const Color success = Color(0xFF28A745);
  static const Color danger = Color(0xFFDC3545);
  static const Color warning = Color(0xFFFFC107);
  static const Color info = Color(0xFF17A2B8);
  static const Color light = Color(0xFFF8F9FA);
  static const Color dark = Color(0xFF343A40);
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);

  static ThemeData lightTheme = ThemeData(
    primaryColor: primary,
    scaffoldBackgroundColor: light,
    appBarTheme: const AppBarTheme(
      backgroundColor: white,
      elevation: 0,
      iconTheme: IconThemeData(color: dark),
      titleTextStyle: TextStyle(
        color: dark,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: dark,
      ),
      bodyLarge: TextStyle(
        fontSize: 16,
        color: dark,
      ),
      bodyMedium: TextStyle(
        fontSize: 14,
        color: secondary,
      ),
    ),
  );
} 