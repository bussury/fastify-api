import connection from './config.js';


export default  {
  development: {
      client: 'mysql2',
      connection,
    //   pool: { min: 0, max: 7 },
      migrations: {
          tableName: 'migrations',
          directory:  './migrations',
          loadExtensions: ['.js','.cjs','mjs'],
      },
      seeds: {
          directory: './seeds',
          loadExtensions: ['.js','.cjs','.mjs'],
      },
      debug: true
  },
  production: {
      client: 'mysql2',
      useNullAsDefault: true,
      connection,
      debug: false
  },
  staging : {}
}
