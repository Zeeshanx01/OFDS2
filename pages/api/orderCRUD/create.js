// pages/api/create.js
import { createConnection } from 'mysql2/promise';

// Function to create a MySQL connection
async function connectToDatabase() {
  return createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log(req);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const { user_id, date, total, status, copn_id } = req.body;
  // console.log(req.body);

  const user_id = 8;
  const date = '2024-12-17';
  const total = 1000.50;
  const status = 1;
  const copn_id = 3;

  if (!user_id || !date || !total || !status || !copn_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Insert data into the orders
    const [result] = await connection.execute(
      'INSERT INTO orders (user_id, date, total, status, copn_id) VALUES (?, ?, ?, ?, ?)',
      [user_id, date, total, status, copn_id]
    );

    // Close the database connection
    await connection.end();

    // Respond with the created data
    res.status(201).json({ id: result.insertId, message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
