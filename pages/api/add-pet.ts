import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
declare const grid: any;

// 在 TypeScript 中使用 grid 变量
console.log(grid);
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const petName = request.query.petName as string;
    const ownerName = request.query.ownerName as string;
    if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${grid});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const pets = await sql`SELECT * FROM Pets;`;
  return response.status(200).json({ pets });
}