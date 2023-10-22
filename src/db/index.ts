import dotenv from 'dotenv';
dotenv.config();

import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);

// Extract the individual components
const auth = params.auth.split(':');
const host = params.hostname;
const port = params.port;
const database = params.pathname.split('/')[1];

//Initial connection
const pool = new Pool({
  user: auth[0],
  password: auth[1],
  host: host,
  port: port,
  database: database,
  ssl: {
    rejectUnauthorized: false, // Only needed if your database requires SSL
  },
});

export const query = async <T extends QueryResultRow = any>(
  queryText: string,
  values?: any[]
): Promise<QueryResult<T>> => {
  const queryConfig: QueryConfig = {
    text: queryText,
    values,
  };

  const result = await pool.query<T>(queryConfig);
  return result;
};
