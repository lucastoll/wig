"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.UserService.getAllUsers();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            if (!email) {
                res.status(400).json({
                    error: "O campo email é obrigatório",
                });
                return;
            }
            try {
                const user = yield userService_1.UserService.getUserByEmail(email);
                if (!user) {
                    res.status(404).json({ error: "Usuário não encontrado" });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, address, categoryIds, zipcode, googleToken } = req.body;
            const fields = [
                "name",
                "email",
                "address",
                "zipcode",
                "categoryIds",
                "googleToken"
            ];
            for (let field of fields) {
                if (!req.body[field]) {
                    res.status(400).json({
                        error: `O campo ${field} é obrigatório`,
                    });
                    return;
                }
            }
            if (!Array.isArray(req.body.categoryIds)) {
                res.status(400).json({
                    error: "O campo categoryIds deve ser um array",
                });
                return;
            }
            try {
                const newUser = yield userService_1.UserService.createUser(name, email, address, categoryIds, zipcode, googleToken);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
