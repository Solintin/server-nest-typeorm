import { config } from 'dotenv';
config();

export default () => {
  const { JWT_EXPIRATION_TIME: JWTExpirationTime, JWT_SECRET: JWTSecret } =
    process.env;

  return {
    jwt: {
      JWTExpirationTime,
      JWTSecret,
    },
  };
};
