const config = require('./dbconfig');
const sql = require('mssql');
const lowercaseKeys = require('lowercase-keys');

async function getCountriess() {
   try {
      let pool = await sql.connect(config);
      let countries = await pool.request().query("SELECT * FROM Countries");
      let lowercaseCountries = lowercaseKeys(countries);
      console.log('IS IT LOWER CASE??????????????')
      console.log(lowercaseCountries);
      return lowercaseCountries;
   }
   catch (error) {
      console.log(error);
   }
}

module.exports = {
   getCountriess: getCountriess
}