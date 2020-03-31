export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET,
  mongoURI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`
});
