import mysql2 from "mysql2";

const database = mysql2.createPool({
	host: "localhost",
	user: "root",
	password: "admin",
	database: "mdsite",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
}).promise();

export default database;