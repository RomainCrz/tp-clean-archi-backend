import { z } from "zod";
import { Request, Response } from 'express';

export const validate = <T extends z.ZodType<any, any>> (
    schema: T, 
    request: Request, 
    response: Response
):z.infer<T> | null  => {
    const body  = request.body;

    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
        response.status(400).json(validationResult.error);
        return null;
    }

    return validationResult.data;
};
