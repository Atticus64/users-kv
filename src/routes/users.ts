import { Hono } from "hono/mod.ts";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/users.ts";

const users = new Hono();

users.get("/", getUsers);

users.post("/", createUser);

users.put("/:id", updateUser);

users.delete("/:id", deleteUser);

export default users;
