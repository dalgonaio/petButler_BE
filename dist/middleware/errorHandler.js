"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../shared/constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants_1.ERROR_TYPES.VALIDATION_ERROR:
            res.status(statusCode).json({ title: 'Validation Failed', message: err.message });
            break;
        case constants_1.ERROR_TYPES.NOT_FOUND:
            res.status(statusCode).json({ title: 'Not Found', message: err.message });
            break;
        case constants_1.ERROR_TYPES.UNAUTHORIZED:
            res.status(statusCode).json({ title: 'Unauthorized', message: err.message });
            break;
        case constants_1.ERROR_TYPES.FORBIDDEN:
            res.status(statusCode).json({ title: 'Forbidden', message: err.message });
            break;
        case constants_1.ERROR_TYPES.SERVER_ERROR:
            res.status(statusCode).json({ title: 'Server Error', message: err.message });
            break;
        default:
            break;
    }
};
exports.errorHandler = errorHandler;
