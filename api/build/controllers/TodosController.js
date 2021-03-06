"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var errors_1 = require("../lib/errors");
var todoRepo_1 = require("../repositories/todoRepo");
var filter = require("express-validator/filter");
var getAllTodos = utils_1.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, todoRepo_1.getTodosForUserId(req.user.id.toString())];
            case 1:
                todos = _a.sent();
                res.status(200).json({ data: todos });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllTodos = getAllTodos;
var storeTodo = utils_1.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = utils_1.getErrors(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ errors: errors.mapped() })];
                }
                data = __assign({}, filter.matchedData(req), { user_id: req.user.id, completed_at: null, deleted_at: null });
                return [4 /*yield*/, todoRepo_1.createTodo(data)];
            case 1:
                _a.sent();
                res.status(201).json({ created: true });
                return [2 /*return*/];
        }
    });
}); });
exports.storeTodo = storeTodo;
var updateTodo = utils_1.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data, todoId, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = utils_1.getErrors(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ errors: errors.mapped() })];
                }
                data = filter.matchedData(req);
                todoId = req.params.todoId;
                return [4 /*yield*/, todoRepo_1.getTodoById(todoId)];
            case 1:
                todo = _a.sent();
                if (todo.user_id !== req.user.id) {
                    throw new errors_1.ForbiddenError();
                }
                return [4 /*yield*/, todoRepo_1.updateTodoById(todoId, data)];
            case 2:
                _a.sent();
                res.status(200).json({ updated: true });
                return [2 /*return*/];
        }
    });
}); });
exports.updateTodo = updateTodo;
var deleteTodo = utils_1.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var todoId, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todoId = req.params.todoId;
                return [4 /*yield*/, todoRepo_1.getTodoById(todoId)];
            case 1:
                todo = _a.sent();
                if (!todo) {
                    throw new errors_1.NotFoundError();
                }
                if (todo.user_id !== req.user.id) {
                    throw new errors_1.ForbiddenError();
                }
                return [4 /*yield*/, todoRepo_1.deleteTodoById(todoId)];
            case 2:
                _a.sent();
                res.status(200).json({ deleted: true });
                return [2 /*return*/];
        }
    });
}); });
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=TodosController.js.map