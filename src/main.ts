import { Hono } from "hono/mod.ts";
import users from "./routes/users.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("turtle 🐢!");
});

app.route("/users", users);

export default app;
