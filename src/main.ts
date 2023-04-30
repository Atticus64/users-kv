import { Hono } from "hono/mod.ts";
import users from "./routes/users.ts";
import { cors } from "hono/middleware/cors/index.ts";

const app = new Hono();

app.use("/", cors());

app.get("/", (c) => {
  return c.text("turtle 🐢!");
});

app.route("/users", users);

export default app;
