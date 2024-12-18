class UserModel {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  final String? bio;
  final String? phone;
  final bool isOnline;
  final DateTime lastSeen;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
    this.bio,
    this.phone,
    required this.isOnline,
    required this.lastSeen,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      avatar: json['avatar'],
      bio: json['bio'],
      phone: json['phone'],
      isOnline: json['isOnline'] ?? false,
      lastSeen: json['lastSeen'] != null
          ? DateTime.parse(json['lastSeen'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'avatar': avatar,
      'bio': bio,
      'phone': phone,
      'isOnline': isOnline,
      'lastSeen': lastSeen.toIso8601String(),
    };
  }

  UserModel copyWith({
    String? name,
    String? email,
    String? avatar,
    String? bio,
    String? phone,
    bool? isOnline,
    DateTime? lastSeen,
  }) {
    return UserModel(
      id: id,
      name: name ?? this.name,
      email: email ?? this.email,
      avatar: avatar ?? this.avatar,
      bio: bio ?? this.bio,
      phone: phone ?? this.phone,
      isOnline: isOnline ?? this.isOnline,
      lastSeen: lastSeen ?? this.lastSeen,
    );
  }

  // 模拟数据
  static UserModel getMockUser() {
    return UserModel(
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      bio: '热爱生活，热爱编程',
      phone: '138****1234',
      isOnline: true,
      lastSeen: DateTime.now(),
    );
  }
} 