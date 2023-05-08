const Pool = require("pg").Pool;

const pool = new Pool({
    user:"edxBriselle",
    password:"Briselle@1212",
    host:"localhost",
    port:5432,
    database:"edxbriselle"
});

module.exports = pool;
