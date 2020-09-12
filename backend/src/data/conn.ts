import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'vevecommerce'
    },
    useNullAsDefault: true,
});

export default db;