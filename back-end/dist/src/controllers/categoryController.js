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
exports.CategoryController = void 0;
const categoryService_1 = require("../services/categoryService");
class CategoryController {
    static getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService_1.CategoryService.getCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!name) {
                res.status(400).json({
                    error: "O campo name é obrigatório",
                });
                return;
            }
            try {
                const newCategory = yield categoryService_1.CategoryService.createCategory(name);
                res.status(201).json(newCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
