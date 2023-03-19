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
    const { ticket_description, ticket_type, ticket_category, ticket_priority, ticket_location, } = request.body;
    const { userId } = request.query;
    try {
        const createTicket = yield prisma.ticket.create({
            data: {
                description: ticket_description,
                ticketType: ticket_type,
                ticketCategory: ticket_category,
                ticketLocation: ticket_location,
                ticketPriority: ticket_priority,
                status: 'new',
                assignedTo: [],
                equipaments: [],
                images: [],
                userId,
            },
        });
        return response.status(200).json({
            message: 'Ticket created successfully',
            body: createTicket,
            error: false,
        });
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
router.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllTickets = yield prisma.ticket.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
            include: {
                ticketCategoryId: true,
                ticketLocationId: true,
                ticketPriorityId: true,
                ticketTypeId: true,
                User: true,
            },
        });
        return response.status(200).json({
            message: 'Ticket created successfully',
            body: getAllTickets,
            error: false,
        });
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
exports.default = router;
