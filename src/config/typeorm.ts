import { createConnection } from 'typeorm';
import path from 'path';

export async function connect() {
  await createConnection({
    type: "mongodb",
    url: "mongodb+srv://limsplus:limsplus1234@cluster0.wcvye.mongodb.net/limsplus",
    entities: [
      path.join(__dirname, '../entity/**/**.ts'),
    ],
    synchronize: true,
  });
  console.log('Database is Connected');
}
