/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | PostgreSQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for PostgreSQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i pg
    |
    */
    pg: {
      client: 'pg',
      connection: getConnection(),
      healthCheck: Application.inDev,
      debug: Application.inDev,
    },
  },
}

function getConnection() {
  if (Application.inProduction) {
    return Env.get('DATABASE_URL') + '?ssl=no-verify'
  }
  if (process.env.NODE_ENV === 'testing') {
    return {
      host: Env.get('PG_HOST_TEST'),
      port: Env.get('PG_PORT_TEST'),
      user: Env.get('PG_USER_TEST'),
      password: Env.get('PG_PASSWORD_TEST', ''),
      database: Env.get('PG_DB_NAME_TEST'),
    }
  }
  return {
    host: Env.get('PG_HOST'),
    port: Env.get('PG_PORT'),
    user: Env.get('PG_USER'),
    password: Env.get('PG_PASSWORD', ''),
    database: Env.get('PG_DB_NAME'),
  }
}

export default databaseConfig
