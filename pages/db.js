import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // 加载 .env 文件中的环境变量

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export async function saveGridToDatabase(grid) {
  const client = await pool.connect();

  try {
    // 执行插入操作将 `grid` 数据保存到数据库表 `puzzles`
    const query = 'INSERT INTO puzzles (Puzzel) VALUES (${grid});';
    const values = [grid];
    await client.query(query, values);
    console.log('Grid data saved to puzzles table.');
  } catch (error) {
    console.error('Error while saving grid data:', error);
  } finally {
    client.release();
  }
}