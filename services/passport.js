import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import keys from '../config/keys';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

const passportService = passport => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id);
        done(null, user || false);
      } catch ({ message }) {
        console.log('[passport.js]', message);
      }
    })
  );
};

export default passportService;
