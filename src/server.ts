import app from "./main.ts";
import { serve } from "std/http/server.ts";

async function server() {
  serve(app.fetch);
}

server();
