const { Pool } = require('pg')
console.log(process.env.NODE_ENV);
const pool = new Pool(process.env.NODE_ENV ?
    {
        connectionString: process.env.DATABASE_URL
    } : null
);

module.exports = pool;