import { App } from "./app";

import { PostsRouter } from "./routes/posts.routes";
import { CommentsRouter } from "./routes/comments.routes";

const app = new App([new PostsRouter(), new CommentsRouter()]);

app.listen();
