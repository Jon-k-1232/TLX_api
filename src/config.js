module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://@localhost/tlx",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || "postgresql://@localhost/tlx_test",
  JWT_SECRET: process.env.JWT_SECRET || process.env.API_TOKEN,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30m",
};
