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
exports.deleteUser = exports.editUser = exports.getSingleUser = exports.createUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../db");
//@desc Get all users
//@route GET /users
//@access public < Jungmee change this once you add authentication
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, db_1.query)('SELECT * FROM users');
    res.status(200).json(result.rows);
}));
//@desc create 1 new user
//@route POST /users/
//@access public < Jungmee change this once you add authentication
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
        res.status(400);
        throw new Error('All fields are mandatory to create a user.');
    }
    res.status(201).json({ message: 'Love, you created a new user!' });
}));
//@desc get 1 user
//@route GET /users/:id
//@access public < Jungmee change this once you add authentication
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: `Love, you got info for user ${req.params.id}` });
});
exports.getSingleUser = getSingleUser;
//@desc edit 1 existing user
//@route PUT /users/:id
//@access public < Jungmee change this once you add authentication
exports.editUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email } = req.body;
    if (!firstName && !lastName && !email) {
        res.status(400);
        throw new Error('No changed data was presented.');
    }
    res.status(201).json({ message: 'Love, you updated a user!' });
}));
//@desc delete 1 existing user
//@route DELETE /users/:id
//@access public < Jungmee change this once you add authentication
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: `Love, you deleted user ${req.params.id}` });
}));
