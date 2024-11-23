import { Request, Response, NextFunction } from "express";
import Joi from "joi";

//request schema
const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body);

        if (error) {
            res.status(400).json({
                status: 102,
                message: error.details[0].message,
                data: null
            })
        }else {
            next()
        }
    }
}

export default validateRequest;