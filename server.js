import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/guest", async (request, reply) => {
  const { nome, tipo } = request.body;

  await database.create({
    nome,
    tipo,
  });

  return reply.status(201).send();
});

server.get("/guest", async (request) => {
  const search = request.query.search;

  const guests = await database.list(search);

  return guests;
});

server.delete("/delete/:id", async (request, reply) => {
  const guestId = request.params.id;

  await database.delete(guestId);

  return reply.status(204);
});

server.listen({
  port: process.env.PORT ?? 3333,
});
