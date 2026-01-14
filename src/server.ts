import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { acessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route";
import { env } from "./env";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: true, //todas as urls front acesse o back, em prod colocar a url do front
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "RANKING",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(acessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP server running!");
});
