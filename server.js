import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import cors from "@fastify/cors";

const server = fastify();

await server.register(cors, {
  origin: true, // Permite qualquer origem
  methods: "GET, POST, PUT, DELETE, OPTIONS", // Todos os métodos
  allowedHeaders: "Content-Type", // Cabeçalhos permitidos
});

const database = new DatabasePostgres();

server.post("/guest", async (request, reply) => {
  const { nome, tipo, status } = request.body;

  await database.create({
    nome,
    tipo,
    status,
  });

  console.log(status);

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
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
