const { Pool } = require('pg')
const pool = new Pool(process.env.NODE_ENV ?
    {
        connectionString: proccess.env.DATABASE_URL
    } : null
);

module.exports = pool;