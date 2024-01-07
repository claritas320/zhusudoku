import { useState, useEffect } from 'react';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const SelectGame = () => {
  const [gameIds, setGameIds] = useState([]);

  useEffect(() => {
    const fetchGameIds = async () => {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT Id FROM puzzles');
        const ids = result.rows.map(row => row.id);
        setGameIds(ids);
        client.release();
      } catch (error) {
        console.error('Error fetching game ids:', error);
      }
    };

    fetchGameIds();
  }, []);

  return (
    <div>
      <select>
        {gameIds.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectGame;