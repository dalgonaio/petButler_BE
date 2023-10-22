import dotenv from 'dotenv';
dotenv.config();

import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';
const url = require('url');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set.');
  process.exit(1); // Terminate the process in case of missing configuration
}

let pool: Pool; // Define the type explicitly as Pool

try {
  const params = url.parse(databaseUrl);

  // Extract the individual components
  const auth = params.auth.split(':');
  const host = params.hostname;
  const port = params.port;
  const database = params.pathname.split('/')[1];

  // Initial connection
  pool = new Pool({
    user: auth[0],
    password: auth[1],
    host: host,
    port: port,
    database: database,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} catch (error) {
  console.error('Error parsing DATABASE_URL:', error);
  process.exit(1); // Terminate the process in case of an error
}

export const query = async <T extends QueryResultRow = any>(
  queryText: string,
  values?: any[]
): Promise<QueryResult<T>> => {
  const queryConfig: QueryConfig = {
    text: queryText,
    values,
  };

  const result = await pool.query(queryConfig);
  return result;
};
