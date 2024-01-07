const { Pool } = require('pg');

// 从环境变量中获取数据库连接信息
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// 插入数据
const insertData = async () => {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO puzzles (Puzzel) VALUES ($1)';
    const values = ['1'];
    await client.query(query, values);
    client.release();
    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};