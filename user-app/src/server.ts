import express, { Request , Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

// Database Connection Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

// API Routes
pool.on('connect', () => {
    console.log('Connected to the PostgresSQL database!');
});


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the User-Facing Marketplace API!');
});

app.get('/api/products', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM marketplace.products'
        const result = await pool.query(query);
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// Server Startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User-Facing API is running on port ${PORT}`);
});