const { Pool } = require("pg");

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = {
	query: (text, params) => pool.query(text, params),
};

module.exports = { db };
