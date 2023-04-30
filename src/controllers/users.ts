import { Context } from "hono/mod.ts";
import * as z from "zod";

const db = await Deno.openKv();

//
// {
//	name: string,
// 	role: Array[ADMIN. USER]
//  langs: [strings]
//  username: string
//  age: number
// }
//

const getUsers = async (c: Context) => {
  const iterator = db.list({ prefix: ["users"] });
  const users = [];
  for await (const entrie of iterator) {
    const user = {
      id: entrie.key.at(1),
      user: entrie.value,
    };
    users.push(user);
  }

  return c.json(users);
};

const createUser = async (c: Context) => {
  const body = await c.req.json();

  const userSchema = z.object({
    name: z.string(),
    role: z.enum(["USER", "ADMIN"]),
    langs: z.array(z.string()),
    username: z.string(),
    age: z.number(),
  });

  const validUser = userSchema.safeParse(body);

  if (!validUser.success) {
    c.status(400);
    return c.json({
      path: validUser.error.issues.at(0)?.path,
      reason: validUser.error.cause ?? validUser.error.issues.at(0)?.message,
    });
  }

  await db.set(["users", crypto.randomUUID()], body);

  c.status(201);

  return c.json({
    user: body,
    created: true,
  });
};

const updateUser = async (c: Context) => {
  const id = c.req.param("id");

  const data = await db.get(["users", id]);

  if (!data.value) {
    c.status(404);
    return c.json({
      error: "User not exist",
    });
  }

  const user = await c.req.json();

  db.set(["users", id], user);

  c.status(200);

  return c.json({
    updated: true,
    id,
  });
};

const deleteUser = async (c: Context) => {
  const id = c.req.param("id");

  const data = await db.get(["users", id]);

  if (!data.value) {
    c.status(404);
    return c.json({
      error: "User not exist",
    });
  }

  db.delete(["users", id]);

  c.status(200);

  return c.json({
    deleted: true,
    id,
  });
};

export { createUser, deleteUser, getUsers, updateUser };
