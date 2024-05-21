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
exports.checkAdminByEmail = void 0;
const user_1 = require("../models/user");
function checkAdminByEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                error: "O email é obrigatório",
            });
            return;
        }
        const user = yield user_1.User.findOne({ where: { email } });
        if ((user === null || user === void 0 ? void 0 : user.administrator) === false) {
            res.status(401).json({
                error: "Operação não autorizada",
            });
        }
        next();
    });
}
exports.checkAdminByEmail = checkAdminByEmail;
