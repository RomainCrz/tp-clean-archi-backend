import { z } from "zod";
import { Request, Response } from 'express';

export const convertStringToDateIfNeeded = (schema: z.ZodType<any, any>, value: any) => {
    if (schema instanceof z.ZodDate && typeof value === 'string') {
        return new Date(value);
    }
    if (schema instanceof z.ZodObject) {
        Object.keys(schema.shape).forEach(key => {
            if (value.hasOwnProperty(key)) {
                value[key] = convertStringToDateIfNeeded(schema.shape[key], value[key]);
            }
        });
    }
    return value;
};

export const validate = <T extends z.ZodType<any, any>> (
    schema: T, 
    request: Request, 
    response: Response
):z.infer<T> | null  => {
    let body  = request.body;

    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
        response.status(400).json(validationResult.error);
        return null;
    }

    return validationResult.data;
};
