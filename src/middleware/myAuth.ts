import dotenv from 'dotenv';
dotenv.config();

const {auth} = require('express-oauth2-jwt-bearer');

export const auth0Check = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN,
});
