import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	try {
		res.locals.message = err.message;
		console.log(err);
		res.status(req.statusCode || 500);
		res.json({
			status: "error",
			message: err.message,
			stack: req.app.get("env") === "development" ? err.stack : {},
		});
	} catch (error) {
		next(error);
	}
}
