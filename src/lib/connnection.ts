import { DATABASE_STR } from "@/config/index";

export const dbConnection = {
	url: DATABASE_STR || "",
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};
