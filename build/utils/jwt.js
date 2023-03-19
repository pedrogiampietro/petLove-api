"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeaders = exports.verifyToken = exports.generateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '5m',
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(userId, jti) {
    return jsonwebtoken_1.default.sign({
        userId: userId,
        jti,
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken,
        refreshToken,
    };
}
exports.generateTokens = generateTokens;
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_ACESS_SECRET);
}
exports.verifyToken = verifyToken;
function getTokenFromHeaders(headers) {
    const token = headers['authorization'];
    return token ? token.slice(7, token.length) : null;
}
exports.getTokenFromHeaders = getTokenFromHeaders;
