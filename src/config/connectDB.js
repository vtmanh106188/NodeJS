// get the client
import mysql from 'mysql';

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejs-asm'
});

export default db;