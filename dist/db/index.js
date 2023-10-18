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
exports.query = void 0;
const pg_1 = require("pg");
//Initial connection TBC
//Jungmee move to env
const pool = new pg_1.Pool({
    user: 'butler1',
    host: 'localhost',
    database: 'pet_butler',
    password: 'cats123',
    port: 5432,
});
const query = (queryText, values) => __awaiter(void 0, void 0, void 0, function* () {
    const queryConfig = {
        text: queryText,
        values,
    };
    const result = yield pool.query(queryConfig);
    return result;
});
exports.query = query;
