import dotenv from 'dotenv';
dotenv.config();

import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';

const url = require('url');

//Params for both local/Heroku
let auth;
let host = process.env.DB_HOST;
let port = parseInt(process.env.DB_PORT || '5432', 10);
let database = process.env.DB_DATABASE;

const db_URL = process.env.DATABASE_URL;
if (db_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  auth = params.auth.split(':');
  host = params.hostname;
  port = params.port;
  database = params.pathname.split('/')[1];
}

//Initial connection
const pool = new Pool({
  user: auth[0],
  password: auth[1],
  host: host,
  port: port,
  database: database,
  ssl: {
    rejectUnauthorized: false,
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
