import jwt from 'jsonwebtoken';
import keys from '../../config/keys';

const createToken = (
  user,
  secret = keys.secretOrKey,
  expiresIn = 3600 * 24
) => {
  const { _id, name, email } = user;
  return 'Bearer ' + jwt.sign({ _id, name, email }, secret, { expiresIn });
};

export default createToken;
