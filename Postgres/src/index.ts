import { Client } from "pg";

const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_tmAL41cwjaNT@ep-wandering-violet-a4erqcmb-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

async function main() {
  await pgClient.connect();
  const response = await pgClient.query("SELECT * FROM users;");
  console.log(response.rows);
}

main();
