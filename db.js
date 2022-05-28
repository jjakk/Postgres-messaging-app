const { Pool } = require('pg')
const pool = new Pool(process.env.NODE_ENV ?
    {
        connectionString: process.env.DATABASE_URL
    } : null
);

module.exports = pool;