import { randomUUID } from "node:crypto";
import { sql } from "./sql.js";

export class DatabasePostgres {

  async list(search) {
    let guests

    if (search) {
      guests = await sql`select * from convidados where nome ilike ${'%' +search+ '%'}`
    }
     else {
      guests = await sql`select * from convidados`

     }
     return guests
  }

  async create(guest) {
    const guestId = randomUUID();
    const { nome, tipo, status } = guest;

  
    await sql`insert into convidados (id, nome, tipo, status) VALUES (${guestId}, ${nome}, ${tipo}, ${status})`;
  }

 async delete(id) {
  await sql`delete from convidados where id = ${id}`
  }
}


