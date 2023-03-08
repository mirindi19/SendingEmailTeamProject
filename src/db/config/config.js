require('dotenv').config();
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT, DATABASE_URL } = process.env;
module.exports = {
	development: {
		username:POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
		host: "localhost",
		dialect: 'postgres',
		port: 5432,
	},
	test: {
		username: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
		host: POSTGRES_HOST,
		dialect: 'postgres',
		port: 5432,
	},
	production: {
		username: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
		host: POSTGRES_HOST,
		dialect: 'postgres',
		port: POSTGRES_PORT,
	},
};