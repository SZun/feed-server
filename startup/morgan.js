import morgan from 'morgan';

const morganLogger = app => {
  try {
    app.use(morgan('common'));
  } catch ({ message }) {
    console.log('[morgan.js]', message);
  }
};

export default morganLogger;
