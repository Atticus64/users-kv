import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.185.0/testing/asserts.ts";
import app from "../src/main.ts";

Deno.test("Example", async () => {
  const res = await app.request("http://localhost:8000");

  console.log(res);
  assertEquals(res.status, 200);
  assertEquals(await res.text(), "turtle 🐢!");
});

Deno.test("Should return err if user does not valid", async () => {
  const res = await app.request("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify({
      "name": "Test",
      "age": 20,
      "langs": ["Python"],
      "username": "test",
      "role": "SUPER_USER",
    }),
  });

  assertEquals(res.status, 400);
});
