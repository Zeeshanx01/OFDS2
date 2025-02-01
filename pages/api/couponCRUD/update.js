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

// Update coupon API route
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const { id, code, disc_perc, exp_date, usage_lim } = req.body;
  // console.log(req.body);

  const id = 1;
  const code = 101;
  const disc_perc = 15.5;
  const exp_date = "2024-12-31";
  const usage_lim = 5;

  if (!id || !code || !disc_perc || !exp_date || !usage_lim) {
    return res
      .status(400)
      .json({
        error: 'id, code, disc_perc, exp_date, and usage_lim are required in the request body.',
      });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to update the coupon in the "coupons" table
    const [result] = await connection.execute(
      'UPDATE coupons SET code = ?, disc_perc = ?, exp_date = ?, usage_lim = ? WHERE id = ?',
      [code, disc_perc, exp_date, usage_lim, id]
    );

    // Close the database connection
    await connection.end();

    // Check if the coupon was updated successfully
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Coupon not found.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Coupon updated successfully' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
