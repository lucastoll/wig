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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../models/user");
const category_1 = require("../models/category");
const customError_1 = require("../errors/customError");
const google_auth_library_1 = require("google-auth-library");
const getCoordinates_1 = __importDefault(require("../helpers/getCoordinates"));
require("dotenv").config();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload)
                throw new customError_1.CustomError("Token inválido", 400);
            return payload;
        }
        catch (err) {
            throw new customError_1.CustomError("Token inválido", 400);
        }
    });
}
class UserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.findAll();
            return users;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { email },
                include: category_1.Category,
            });
            return user;
        });
    }
    static createUser(name, email, address, categoryIds, zipcode, googleToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleUser = yield verify(googleToken);
            if (googleUser.email !== email) {
                throw new customError_1.CustomError("O token do Google não corresponde ao email fornecido", 400);
            }
            const categories = yield category_1.Category.findAll({
                where: { id: categoryIds },
            });
            if (categories.length !== categoryIds.length) {
                throw new customError_1.CustomError("Uma ou mais categorias não foram encontradas", 404);
            }
            const { latitude, longitude } = yield (0, getCoordinates_1.default)(zipcode);
            const existingUser = yield user_1.User.findOne({ where: { email } });
            if (existingUser) {
                throw new customError_1.CustomError("Usuário já cadastrado", 400);
            }
            const newUser = yield user_1.User.create({
                name,
                email,
                address,
                zipcode,
                coordlat: latitude,
                coordlon: longitude,
            });
            yield newUser.addCategories(categories);
            const reloadedUser = yield newUser.reload({ include: category_1.Category });
            return reloadedUser;
        });
    }
}
exports.UserService = UserService;
