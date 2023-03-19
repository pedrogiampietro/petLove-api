"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TicketController_1 = __importDefault(require("./controllers/TicketController"));
const EquipamentController_1 = __importDefault(require("./controllers/EquipamentController"));
const TicketCategory_1 = __importDefault(require("./controllers/TicketCategory"));
const TicketPriority_1 = __importDefault(require("./controllers/TicketPriority"));
const TicketTypeController_1 = __importDefault(require("./controllers/TicketTypeController"));
const LocationController_1 = __importDefault(require("./controllers/LocationController"));
const app = (0, express_1.default)();
app.use((_, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.header('Access-Control-Expose-Headers', 'x-total-count');
    return next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/authenticate', AuthController_1.default);
app.use('/account', UserController_1.default);
app.use('/ticket', TicketController_1.default);
app.use('/ticket-category', TicketCategory_1.default);
app.use('/ticket-priority', TicketPriority_1.default);
app.use('/ticket-type', TicketTypeController_1.default);
app.use('/location', LocationController_1.default);
app.use('/equipament', EquipamentController_1.default);
app.get('/', (req, res) => {
    return res.json({ status: 'OK', data: new Date().toLocaleString() });
});
app.listen(3333);
