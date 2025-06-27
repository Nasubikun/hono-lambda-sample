import { hc } from "hono/client";
import { AppType } from "./app.js";

const client = hc<AppType>("/")

const res = await client.hello.$get()
