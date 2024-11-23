"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//request schema
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({
                status: 102,
                message: error.details[0].message,
                data: null
            });
        }
        else {
            next();
        }
    };
};
exports.default = validateRequest;
