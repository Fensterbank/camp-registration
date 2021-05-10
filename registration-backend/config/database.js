module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'camp_registration'),
        username: env('DATABASE_USERNAME', 'dev'),
        password: env('DATABASE_PASSWORD', 'mdbdevpass'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
