const { Pool } = require('pg')
const pool = new Pool(process.env.NODE_ENV === 'production' ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} : null);

module.exports = pool;