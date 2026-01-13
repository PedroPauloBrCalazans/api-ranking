import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(7474), // transformando para o tipo number
  POSTGRES_URL: z.url(),
  REDIS_URL: z.url(),
  WEB_URL: z.url(),
});

export const env = envSchema.parse(process.env);
