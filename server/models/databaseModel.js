const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://zbebnpil:fAEA8z0o0PYsDmAmprfZK_Zym8vzdCKd@isilo.db.elephantsql.com/zbebnpil'
});

module.exports = {
  query: (text) => {
    console.log('Executed database query ', text);
    return pool.query(text);
  }
};// Makes it so that db.query logs the query and returns pool.query