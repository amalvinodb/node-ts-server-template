import { Router } from "express";
import { Routes } from "@/types/router.interface";

export class CommentsRouter implements Routes {
	public path = "/comments";
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.get(`${this.path}`, (req, res) => {
			res.send("Comments");
		});
	}
}
