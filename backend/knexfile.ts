import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'vevecommerce'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'data', 'migrations')
    },
    useNullAsDefault: true,
};