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

  // const { order_id, date, amount, method, status } = req.body;
  // console.log(req.body);

  const order_id = 3;
  const date = '2024-12-17';
  const amount = 100.50;
  const method = 1; // Example: 1 = Credit Card
  const status = 1; // Example: 1 = Completed

  if (!order_id || !date || !amount || !method || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Insert data into the payments table
    const [result] = await connection.execute(
      'INSERT INTO payments (order_id, date, amount, method, status) VALUES (?, ?, ?, ?, ?)',
      [order_id, date, amount, method, status]
    );

    // Close the database connection
    await connection.end();

    // Respond with the created data
    res.status(201).json({ id: result.insertId, message: 'Payment data inserted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
