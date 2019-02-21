import bodyParser from 'body-parser';

const bodyParserConnection = app => {
  try {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  } catch ({ message }) {
    console.log('[bodyParser.js]', { message });
  }
};

export default bodyParserConnection;
