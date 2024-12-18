"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var ws_jwt_guard_1 = require("../auth/guards/ws-jwt.guard");
var socket_event_enum_1 = require("./enums/socket-event.enum");
var ChatGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*',
                credentials: true,
            },
            namespace: 'chat',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleJoinRoom_decorators;
    var _handleLeaveRoom_decorators;
    var _handleSendMessage_decorators;
    var _handleTyping_decorators;
    var _handleMessageRead_decorators;
    var _handleMarkAllMessagesAsRead_decorators;
    var _handleGetUnreadCount_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1(chatService, usersService, jwtService) {
            this.chatService = (__runInitializers(this, _instanceExtraInitializers), chatService);
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.connectedClients = (__runInitializers(this, _server_extraInitializers), new Map());
        }
        ChatGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, user, chatRooms, _i, chatRooms_1, room, statusEvent, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            token = (_a = client.handshake.auth.token) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                            if (!token) {
                                client.emit(socket_event_enum_1.SocketEvent.UNAUTHORIZED, { message: '未授权' });
                                client.disconnect();
                                return [2 /*return*/];
                            }
                            payload = this.jwtService.verify(token);
                            return [4 /*yield*/, this.usersService.findById(payload.sub)];
                        case 1:
                            user = _b.sent();
                            client.data.user = user;
                            this.connectedClients.set(user.id, client);
                            return [4 /*yield*/, this.usersService.updateOnlineStatus(user.id, true)];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, this.chatService.getChatRooms(user.id)];
                        case 3:
                            chatRooms = _b.sent();
                            for (_i = 0, chatRooms_1 = chatRooms; _i < chatRooms_1.length; _i++) {
                                room = chatRooms_1[_i];
                                client.join(room.id);
                                client.emit(socket_event_enum_1.SocketEvent.ROOM_JOINED, { roomId: room.id });
                            }
                            statusEvent = {
                                userId: user.id,
                                isOnline: true,
                            };
                            this.server.emit(socket_event_enum_1.SocketEvent.USER_ONLINE, statusEvent);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _b.sent();
                            client.emit(socket_event_enum_1.SocketEvent.ERROR, { message: error_1.message });
                            client.disconnect();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleDisconnect = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var user, statusEvent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!client.data.user) return [3 /*break*/, 2];
                            user = client.data.user;
                            this.connectedClients.delete(user.id);
                            return [4 /*yield*/, this.usersService.updateOnlineStatus(user.id, false)];
                        case 1:
                            _a.sent();
                            statusEvent = {
                                userId: user.id,
                                isOnline: false,
                                lastSeen: new Date(),
                            };
                            this.server.emit(socket_event_enum_1.SocketEvent.USER_OFFLINE, statusEvent);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleJoinRoom = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRoom, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatService.getChatRoomById(data.roomId, client.data.user.id)];
                        case 1:
                            chatRoom = _a.sent();
                            client.join(data.roomId);
                            client.emit(socket_event_enum_1.SocketEvent.ROOM_JOINED, { roomId: data.roomId });
                            return [2 /*return*/, { status: 'ok' }];
                        case 2:
                            error_2 = _a.sent();
                            if (error_2.message === '聊天室不存在') {
                                throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.NOT_FOUND, message: error_2.message });
                            }
                            if (error_2.message === '您不是该聊天室的成员') {
                                throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.FORBIDDEN, message: error_2.message });
                            }
                            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error_2.message });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleLeaveRoom = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    client.leave(data.roomId);
                    client.emit(socket_event_enum_1.SocketEvent.ROOM_LEFT, { roomId: data.roomId });
                    return [2 /*return*/, { status: 'ok' }];
                });
            });
        };
        ChatGateway_1.prototype.handleSendMessage = function (client, createMessageDto) {
            return __awaiter(this, void 0, void 0, function () {
                var message, messageEvent, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatService.createMessage(createMessageDto, client.data.user.id)];
                        case 1:
                            message = _a.sent();
                            messageEvent = {
                                id: message.id,
                                content: message.content,
                                senderId: client.data.user.id,
                                senderName: client.data.user.name,
                                chatRoomId: createMessageDto.chatRoomId,
                                createdAt: message.createdAt,
                                isRead: message.isRead,
                            };
                            // 广播消息到聊天室
                            this.server.to(createMessageDto.chatRoomId).emit(socket_event_enum_1.SocketEvent.NEW_MESSAGE, messageEvent);
                            // 确认消息已送达
                            client.emit(socket_event_enum_1.SocketEvent.MESSAGE_RECEIVED, { messageId: message.id });
                            return [2 /*return*/, { status: 'ok', data: message }];
                        case 2:
                            error_3 = _a.sent();
                            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error_3.message });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleTyping = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // 广播用户输入状态
                    this.server.to(data.roomId).emit(data.isTyping ? socket_event_enum_1.SocketEvent.USER_TYPING : socket_event_enum_1.SocketEvent.USER_STOP_TYPING, {
                        userId: client.data.user.id,
                        name: client.data.user.name,
                        roomId: data.roomId,
                    });
                    return [2 /*return*/];
                });
            });
        };
        ChatGateway_1.prototype.handleMessageRead = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var message, senderSocket, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatService.markMessageAsRead(data.messageId, client.data.user.id)];
                        case 1:
                            message = _a.sent();
                            senderSocket = this.getUserSocket(message.sender.id);
                            if (senderSocket) {
                                senderSocket.emit(socket_event_enum_1.SocketEvent.MESSAGE_READ, {
                                    messageId: message.id,
                                    readBy: client.data.user.id,
                                    chatRoomId: message.chatRoom.id,
                                });
                            }
                            return [2 /*return*/, { status: 'ok' }];
                        case 2:
                            error_4 = _a.sent();
                            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error_4.message });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleMarkAllMessagesAsRead = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatService.markAllMessagesAsRead(data.chatRoomId, client.data.user.id)];
                        case 1:
                            _a.sent();
                            // 通知聊天室所有成员
                            this.server.to(data.chatRoomId).emit('allMessagesRead', {
                                chatRoomId: data.chatRoomId,
                                readBy: client.data.user.id,
                            });
                            return [2 /*return*/, { status: 'ok' }];
                        case 2:
                            error_5 = _a.sent();
                            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error_5.message });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleGetUnreadCount = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var unreadCounts, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatService.getUnreadMessageCount(client.data.user.id)];
                        case 1:
                            unreadCounts = _a.sent();
                            client.emit('unreadCount', unreadCounts);
                            return [2 /*return*/, { status: 'ok', data: unreadCounts }];
                        case 2:
                            error_6 = _a.sent();
                            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error_6.message });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.getUserSocket = function (userId) {
            return this.connectedClients.get(userId);
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleJoinRoom_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.JOIN_ROOM)];
        _handleLeaveRoom_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.LEAVE_ROOM)];
        _handleSendMessage_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.SEND_MESSAGE)];
        _handleTyping_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.USER_TYPING)];
        _handleMessageRead_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.MESSAGE_READ)];
        _handleMarkAllMessagesAsRead_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)('markAllMessagesAsRead')];
        _handleGetUnreadCount_decorators = [(0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, websockets_1.SubscribeMessage)('getUnreadCount')];
        __esDecorate(_classThis, null, _handleJoinRoom_decorators, { kind: "method", name: "handleJoinRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinRoom" in obj; }, get: function (obj) { return obj.handleJoinRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveRoom_decorators, { kind: "method", name: "handleLeaveRoom", static: false, private: false, access: { has: function (obj) { return "handleLeaveRoom" in obj; }, get: function (obj) { return obj.handleLeaveRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSendMessage_decorators, { kind: "method", name: "handleSendMessage", static: false, private: false, access: { has: function (obj) { return "handleSendMessage" in obj; }, get: function (obj) { return obj.handleSendMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTyping_decorators, { kind: "method", name: "handleTyping", static: false, private: false, access: { has: function (obj) { return "handleTyping" in obj; }, get: function (obj) { return obj.handleTyping; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessageRead_decorators, { kind: "method", name: "handleMessageRead", static: false, private: false, access: { has: function (obj) { return "handleMessageRead" in obj; }, get: function (obj) { return obj.handleMessageRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkAllMessagesAsRead_decorators, { kind: "method", name: "handleMarkAllMessagesAsRead", static: false, private: false, access: { has: function (obj) { return "handleMarkAllMessagesAsRead" in obj; }, get: function (obj) { return obj.handleMarkAllMessagesAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGetUnreadCount_decorators, { kind: "method", name: "handleGetUnreadCount", static: false, private: false, access: { has: function (obj) { return "handleGetUnreadCount" in obj; }, get: function (obj) { return obj.handleGetUnreadCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
