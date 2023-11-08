import { Router } from "express";
import { Routes } from "@/types/router.interface";

export class PostsRouter implements Routes {
	public path = "/posts";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, (req, res) => {
			res.send("posts");
		});
	}
}
