import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const grid = request.body.grid; // 从请求中获取 grid 数据
    if (!grid) throw new Error('Grid data required');
    await sql`INSERT INTO puzzles (grid) VALUES (${grid});`; // 将 grid 数据插入到数据库表 puzzles 中
  } catch (error) {
    return response.status(500).json({ error });
  }

  const puzzles = await sql`SELECT * FROM puzzles;`; // 获取 puzzles 表中的数据
  return response.status(200).json({ puzzles });
}