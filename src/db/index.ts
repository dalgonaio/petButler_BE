import {Pool, QueryConfig, QueryResult, QueryResultRow} from 'pg';

//Initial connection TBC
//Jungmee move to env
const pool = new Pool({
  user: 'butler1',
  host: 'localhost',
  database: 'pet_butler',
  password: 'cats123',
  port: 5432,
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
