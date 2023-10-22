import dotenv from 'dotenv';
dotenv.config();

import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';

//Initial connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_DATABASE,
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
