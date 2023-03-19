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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.query;
    const { name, model, serialNumber, patrimonyTag } = request.body;
    try {
        const createEquipament = yield prisma.equipaments.create({
            data: {
                name,
                model,
                serialNumber,
                patrimonyTag,
                userId: String(userId),
            },
        });
        return response.status(200).json({
            message: 'Equipament created successfully',
            body: createEquipament,
            error: false,
        });
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
router.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllEquipaments = yield prisma.equipaments.findMany();
        return response.status(200).json({
            message: 'Equipament found',
            body: getAllEquipaments,
            error: false,
        });
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
exports.default = router;
