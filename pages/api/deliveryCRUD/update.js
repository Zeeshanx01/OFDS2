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

  // const { id, order_id, person, status, date } = req.body;
  // console.log(req.body);

  const id = 2;
  const order_id = 3;
  const person = 'John Doe';
  const status = 1; // Example: 1 = Delivered
  const date = '2023-12-17';

  if (!id || !order_id || !person || !status || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Update data in the delivery_details table
    const [result] = await connection.execute(
      'UPDATE delivery_details SET order_id = ?, person = ?, status = ?, date = ? WHERE id = ?',
      [order_id, person, status, date, id]
    );

    // Close the database connection
    await connection.end();

    // Check if the data was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Delivery details not found.' });
    }

    // Respond with the success message
    res.status(200).json({ message: 'Delivery details updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
