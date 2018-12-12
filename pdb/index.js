const { Pool } = require('pg'),
    config = require('../config.json');

const pool = new Pool({
    user: config.psql_user,
    host: config.psql_host,
    database: config.psql_database,
    password: config.psql_password,
    port: config.psql_port
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
   }//,
//     getClient: (callback) {
//         pool.connect((err, client, done) => {
//         const query = client.query.bind(client)

//         // Keep track of the last query executed
//         client.query = () => {
//             client.lastQuery = arguments
//             client.query.apply(client, arguments)
//         }

//         // set a timeout of 5 seconds, after which we will log this client's last query
//         const timeout = setTimeout(() => {
//             console.error('A client has been checked out for more than 5 seconds!')
//             console.error(`The last executed query on this client was: ${client.lastQuery}`)
//         }, 5000)

//         const release = (err) => {
//             // call the actual 'done' method, returning this client to the pool
//             done(err)

//             // clear our timeout
//             clearTimeout(timeout)

//             // set the query method back
//             client.query = query
//         }

//         callback(err, client, done)
//         })
//     }
//     }
};