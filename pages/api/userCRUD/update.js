import { createConnection } from 'mysql2/promise';

// Function to create a MySQL connection
async function connectToDatabase() {
    return createConnection({
      host: process.env.DB_HOST ,
      port: process.env.DB_PORT, 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

// Update user API route
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const { name, email, password, address } = req.nody;
  // console.log(req.body);

  const id = '7'
  const name = "Zeeshan"
  const email = "zeeshan.x01000@g"
  const password = '1231312'
  const address = 'abcstreet232'


  if (!id || !name || !email || !password || !address) {
    return res.status(400).json({ error: 'id, name, email, address and password are required in the request body.' });
  }


  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to update the user in the "users" table
    const [result] = await connection.execute(
      'UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE id = ?',
      [name, email, password, address, id]
    );

    // Close the database connection
    await connection.end();

    // Check if the user was updated successfully
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'user not found.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'user updated successfully' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}