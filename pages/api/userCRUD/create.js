// pages/api/create.js
// 'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { createConnection } from 'mysql2/promise';
// import bcrypt from 'bcrypt';

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
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let { name, email, password, address } = req.body;
  console.log(req.body);

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Ensure password and address are never undefined
  password = password ?? ''; // Default to an empty string
  address = address ?? ''; // Default to an empty string

  try {
    const connection = await connectToDatabase();

    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)',
      [name, email, password, address]
    );

    await connection.end();

    res.status(201).json({ id: result.insertId, message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
