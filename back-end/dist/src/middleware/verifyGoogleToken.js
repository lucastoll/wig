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
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
function verifyGoogleToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { googleToken, email } = req.body;
        if (!googleToken) {
            res.status(400).json({
                error: "O campo googleToken é obrigatório",
            });
            return;
        }
        if (!email) {
            res.status(400).json({
                error: "O campo email é obrigatório",
            });
            return;
        }
        try {
            const ticket = yield client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                res.status(400).json({
                    error: "Token inválido",
                });
                return;
            }
            if (email !== payload.email) {
                res.status(400).json({
                    error: "O token do Google não corresponde ao usuário",
                });
                return;
            }
            next();
        }
        catch (err) {
            console.error(err);
            res.status(400).json({
                error: "Token inválido",
            });
        }
    });
}
exports.verifyGoogleToken = verifyGoogleToken;
