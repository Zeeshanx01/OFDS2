// pages/api/delete.js
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

// Delete data from reviews table API route
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const { id } = req.body;
  // console.log(req.body);

  const id = 2;

  if (!id) {
    return res.status(400).json({ error: 'id is required in the request body.' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to delete data from the reviews table
    const [result] = await connection.execute('DELETE FROM reviews WHERE id = ?', [id]);

    // Close the database connection
    await connection.end();

    // Check if the data was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    // Respond with the success message
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
