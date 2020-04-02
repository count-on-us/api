export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }
});
