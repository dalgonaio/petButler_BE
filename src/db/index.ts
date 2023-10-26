const dotenv = require('dotenv');
dotenv.config();

import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';

let db: Pool;
const db_URL = process.env.DATABASE_URL;
console.log('lupin db url', db_URL);

if (db_URL) {
  const config = {
    connectionString: db_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  console.log('lupin check config>', config);
  db = new Pool(config);
  console.log('lupin db>', db);
} else {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  db = new Pool(config);
}

export const query = async <T extends QueryResultRow = any>(
  queryText: string,
  values?: any[]
): Promise<QueryResult<T>> => {
  const queryConfig: QueryConfig = {
    text: queryText,
    values,
  };

  const result = await db.query<T>(queryConfig);
  return result;
};
