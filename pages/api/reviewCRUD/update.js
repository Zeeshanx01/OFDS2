// pages/api/update.js
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
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const { id, user_id, res_id, rating, comment } = req.body;
  // console.log(req.body);

  const id = 2;
  const user_id = 8;
  const res_id = 1;
  const rating = 4.5; // Example rating
  const comment = 'Food and service were excellent!';

  if (!id || !user_id || !res_id || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Update data in the reviews table
    const [result] = await connection.execute(
      'UPDATE reviews SET user_id = ?, res_id = ?, rating = ?, comment = ? WHERE id = ?',
      [user_id, res_id, rating, comment, id]
    );

    // Close the database connection
    await connection.end();

    // Check if the data was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    // Respond with the success message
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
