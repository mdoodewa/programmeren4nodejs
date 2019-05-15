const sql = require('mssql')
const config = require('../config/appconfig')

const logger = config.logger
const dbconfig = config.dbconfig

module.exports = {
  executeQuery: (query, callback) => {
    sql.connect(dbconfig, err => {
      // ... error checks
      if (err) {
        logger.error('Error connecting: ', err.toString())
        callback(err, null)
        sql.close()
      }
        // Query
        new sql.Request().query(query, (err, result) => {
          // ... error checks
          if (err) {
            logger.error('error', err.toString())
            callback(err, null)
            sql.close()
          }
          if (result) {
            logger.info(result)
            callback(null, result.recordset)
            sql.close()
          }
        })
      }
    )
  }
};