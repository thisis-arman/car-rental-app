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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const AppError_1 = __importDefault(require("../../error/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `this user ${payload.email} does not exist`);
    }
    const isDeleted = user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `this User is already deleted`);
    }
    console.log("passwords", payload.password, user);
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Password does not match`);
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    console.log({ jwtPayload });
    // Create access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.jwt_access_token_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_token_expires_in);
    console.log({ accessToken });
    return {
        accessToken,
        refreshToken,
        user
    };
});
const changePassword = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find(query);
    return result;
});
const refreshToken = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find(query);
    return result;
});
exports.authServices = {
    loginUser,
    changePassword,
    refreshToken
};
