import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cors from "cors";
import { errorHandler } from "@/middleware/errorHandling.middleware";
import { dbConnection } from "@/lib/connnection";
import { connect, set, ConnectOptions } from "mongoose";
import { ORIGIN, CREDENTIALS } from "@/config/index";
import { Routes } from "@/types/router.interface";

export class App {
	public app: express.Express;
	public env: string;
	public port: string | number;

	constructor(routes: Routes[]) {
		this.app = express();
		this.env = process.env.NODE_ENV || "development";
		this.port = process.env.PORT_NO || 8000;
		this.connectToDataBase();
		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.errorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`=================================`);
			console.log(`======= ENV: ${this.env} =======`);
			console.log(`🚀 App listening on the port ${this.port}`);
			console.log(`available in: http://localhost:${this.port}`);
			console.log(`=================================`);
		});
	}

	private async connectToDataBase() {
		if (this.env !== "production") {
			set("debug", true);
			set("strictQuery", false);
			try {
				await connect(dbConnection.url, dbConnection.options as ConnectOptions);
				console.info("Connected to database");
			} catch (err) {
				console.error("DB connection failed");
			}
		}
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach((route) => {
			this.app.use("/", route.router);
		});
	}

	private errorHandling() {
		this.app.use(errorHandler);
	}
}
