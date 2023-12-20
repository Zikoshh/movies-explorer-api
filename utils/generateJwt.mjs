import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'dev_secret', {
    expiresIn: '30d',
  });

  return token;
};

export default generateJwtToken;
