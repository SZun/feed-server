import mongoose from 'mongoose';
import passport from 'passport';
import passportService from '../services/passport';
import bodyParser from './bodyParser';
import connection from './connection';
import morganLogger from './morgan';
import routes from './routes';

const startup = app => {
  connection(mongoose);
  bodyParser(app);
  morganLogger(app);
  app.use(passport.initialize());
  passportService(passport);
  routes(app);
};

export default startup;
