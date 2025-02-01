// pages/api/create.js
// 'use client'
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

  // const { code, disc_perc, exp_date, usage_lim } = req.body;
  // console.log(req.body);

  const code = 12345
  const disc_perc = 15.5
  const exp_date = '2024-12-31'
  const usage_lim = 100
  
  if (!code || !disc_perc || !exp_date || !usage_lim) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to insert data into the "coupons" table
    const [result] = await connection.execute(
      'INSERT INTO coupons (code, disc_perc, exp_date, usage_lim) VALUES (?, ?, ?, ?)',
      [code, disc_perc, exp_date, usage_lim]
    );

    // Close the database connection
    await connection.end();

    // Respond with the created coupon data
    res.status(201).json({ id: result.insertId, message: 'Coupon added successfully' });
  } catch (error) {
    console.error('Error:', error.message); // Logs the error message
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
