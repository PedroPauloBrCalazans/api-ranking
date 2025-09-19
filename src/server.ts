import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: true, //todas as urls front acesse o back, em prod colocar a url do front
});

app.listen({ port: 7474 }).then(() => {
  console.log("HTTP server running!");
});
