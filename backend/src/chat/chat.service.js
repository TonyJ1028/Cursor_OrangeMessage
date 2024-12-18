"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.ChatService = void 0;
var common_1 = require("@nestjs/common");
var ChatService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatService = _classThis = /** @class */ (function () {
        function ChatService_1(messageRepository, chatRoomRepository, usersService) {
            this.messageRepository = messageRepository;
            this.chatRoomRepository = chatRoomRepository;
            this.usersService = usersService;
        }
        ChatService_1.prototype.createChatRoom = function (createChatRoomDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var participants, currentUser, chatRoom;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(createChatRoomDto.participantIds.map(function (id) { return _this.usersService.findById(id); }))];
                        case 1:
                            participants = _a.sent();
                            return [4 /*yield*/, this.usersService.findById(userId)];
                        case 2:
                            currentUser = _a.sent();
                            participants.push(currentUser);
                            chatRoom = this.chatRoomRepository.create(__assign(__assign({}, createChatRoomDto), { participants: participants }));
                            return [2 /*return*/, this.chatRoomRepository.save(chatRoom)];
                    }
                });
            });
        };
        ChatService_1.prototype.getChatRooms = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.chatRoomRepository
                            .createQueryBuilder('chatRoom')
                            .leftJoinAndSelect('chatRoom.participants', 'participant')
                            .leftJoinAndSelect('chatRoom.messages', 'message')
                            .where('participant.id = :userId', { userId: userId })
                            .orderBy('message.createdAt', 'DESC')
                            .getMany()];
                });
            });
        };
        ChatService_1.prototype.getChatRoomById = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRoom;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRoomRepository
                                .createQueryBuilder('chatRoom')
                                .leftJoinAndSelect('chatRoom.participants', 'participant')
                                .leftJoinAndSelect('chatRoom.messages', 'message')
                                .leftJoinAndSelect('message.sender', 'sender')
                                .where('chatRoom.id = :id', { id: id })
                                .orderBy('message.createdAt', 'ASC')
                                .getOne()];
                        case 1:
                            chatRoom = _a.sent();
                            if (!chatRoom) {
                                throw new common_1.NotFoundException('聊天室不存在');
                            }
                            if (!chatRoom.participants.some(function (p) { return p.id === userId; })) {
                                throw new common_1.ForbiddenException('您不是该聊天室的成员');
                            }
                            return [2 /*return*/, chatRoom];
                    }
                });
            });
        };
        ChatService_1.prototype.createMessage = function (createMessageDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRoom, sender, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getChatRoomById(createMessageDto.chatRoomId, userId)];
                        case 1:
                            chatRoom = _a.sent();
                            return [4 /*yield*/, this.usersService.findById(userId)];
                        case 2:
                            sender = _a.sent();
                            message = this.messageRepository.create({
                                content: createMessageDto.content,
                                sender: sender,
                                chatRoom: chatRoom,
                            });
                            return [2 /*return*/, this.messageRepository.save(message)];
                    }
                });
            });
        };
        ChatService_1.prototype.getMessages = function (chatRoomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRoom;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getChatRoomById(chatRoomId, userId)];
                        case 1:
                            chatRoom = _a.sent();
                            return [2 /*return*/, this.messageRepository
                                    .createQueryBuilder('message')
                                    .leftJoinAndSelect('message.sender', 'sender')
                                    .where('message.chatRoomId = :chatRoomId', { chatRoomId: chatRoomId })
                                    .orderBy('message.createdAt', 'ASC')
                                    .getMany()];
                    }
                });
            });
        };
        ChatService_1.prototype.markMessagesAsRead = function (chatRoomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getChatRoomById(chatRoomId, userId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder()
                                    .update()
                                    .set({ isRead: true })
                                    .where('chatRoomId = :chatRoomId', { chatRoomId: chatRoomId })
                                    .andWhere('senderId != :userId', { userId: userId })
                                    .execute()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatService_1.prototype.markMessageAsRead = function (messageId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository
                                .createQueryBuilder('message')
                                .leftJoinAndSelect('message.chatRoom', 'chatRoom')
                                .leftJoinAndSelect('chatRoom.participants', 'participant')
                                .where('message.id = :messageId', { messageId: messageId })
                                .getOne()];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException('消息不存在');
                            }
                            if (!message.chatRoom.participants.some(function (p) { return p.id === userId; })) {
                                throw new common_1.ForbiddenException('您不是该聊天室的成员');
                            }
                            if (message.sender.id === userId) {
                                throw new common_1.ForbiddenException('不能标记自己的消息为已读');
                            }
                            message.isRead = true;
                            return [2 /*return*/, this.messageRepository.save(message)];
                    }
                });
            });
        };
        ChatService_1.prototype.markAllMessagesAsRead = function (chatRoomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRoom;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getChatRoomById(chatRoomId, userId)];
                        case 1:
                            chatRoom = _a.sent();
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder()
                                    .update()
                                    .set({ isRead: true })
                                    .where('chatRoomId = :chatRoomId', { chatRoomId: chatRoomId })
                                    .andWhere('senderId != :userId', { userId: userId })
                                    .execute()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatService_1.prototype.getUnreadMessageCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var chatRooms, unreadCounts, _i, chatRooms_1, room, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getChatRooms(userId)];
                        case 1:
                            chatRooms = _a.sent();
                            unreadCounts = {};
                            _i = 0, chatRooms_1 = chatRooms;
                            _a.label = 2;
                        case 2:
                            if (!(_i < chatRooms_1.length)) return [3 /*break*/, 5];
                            room = chatRooms_1[_i];
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder('message')
                                    .where('message.chatRoomId = :roomId', { roomId: room.id })
                                    .andWhere('message.senderId != :userId', { userId: userId })
                                    .andWhere('message.isRead = :isRead', { isRead: false })
                                    .getCount()];
                        case 3:
                            count = _a.sent();
                            unreadCounts[room.id] = count;
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, unreadCounts];
                    }
                });
            });
        };
        return ChatService_1;
    }());
    __setFunctionName(_classThis, "ChatService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatService = _classThis;
}();
exports.ChatService = ChatService;
