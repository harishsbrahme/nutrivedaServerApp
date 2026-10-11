import type { Request, Response, NextFunction } from 'express'

export function commonErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        switch (err.message) {
            case 'Category Not Found':
                res.status(404).json({ message: err.message });
                break;
            case 'Category ID already exists':
                 res.status(409).json({ message: err.message });
                break;
            case 'Invalid request data':
                 res.status(400).json({ message: err.message });
                break;
            default:
                 res.status(500).json({ message: "Internal Server Error" });
                break;
        }
       
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
}