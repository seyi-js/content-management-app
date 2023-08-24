module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseFloat(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    define: {
      underscored: true,
    },
    autoLoadModels: true,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seeder',
  },
  test: {
    // dialect: 'sqlite',
    // storage: ':memory:',
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseFloat(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    define: {
      underscored: true,
    },
    autoLoadModels: true,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seeder',
  },
};
