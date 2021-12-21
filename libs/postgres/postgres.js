/* const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

module.exports = getConnection; */

const { Pool: PostgresClient } = require('pg')
const config = require('../../config/config')

const USER = encodeURIComponent(config.DB.DB_USER)
const PASSWORD = encodeURIComponent(config.DB.DB_PASS)
const URI = `postgres://${USER}:${PASSWORD}@${config.DB.DB_HOST}:${config.DB.DB_PORT}/${config.DB.DB_NAME}`

class Postgres {
  /**
     * @private
     * @description singleton pattern for pool connection
     * @returns {object}- connection client
     */
  async connect () {
    try {
      if (!Postgres.connection) {
      /*   Postgres.connection = new PostgresClient({
          user: config.DB.DB_USER,
          host: config.DB.DB_HOST,
          database: config.DB.DB_NAME,
          password: config.DB.DB_PASS,
          port: config.DB.DB_PORT
        }) */
        Postgres.connection = new PostgresClient({
          connectionString: URI
        })
        console.log('Connected succesfully')
      }
      return Postgres.connection
    } catch (error) {
      console.log(error)
    }
  }

  /**
     * @description query process in table
     * @param {string} request - SQL string request
     * @returns {Object} - response query postgresDB
     */
  async query (request) {
    try {
      const db = await this.connect()
      return await db.query(request)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = {
  Postgres
}
