require('dotenv').config();
const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const hotelRouter    = require('./resources/hotels');

// who is setting our port?
const PORT = process.argv[2] || process.env.PORT || 3000;

// start up express
const app = express();
const dir = {
  public:      path.join(__dirname, 'public'),
  jquery:      path.join(__dirname, 'node_modules/jquery/dist'),
  materialize: path.join(__dirname, 'node_modules/materialize-css/dist'),
};

// set up some logging
app.use(logger('dev'));

// Set up body parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up static middleware for public folders
app.use(express.static(dir.public));
app.use('/vendor/jquery', express.static(dir.jquery));
app.use('/vendor/materialize', express.static(dir.materialize));

// Set up Node to use EJS as templating engine
app.set('view engine', 'ejs');

// Set up method override to allow HTML forms to perform PUT and DELETE requests
app.use(methodOverride('_method'));

/* ROUTES */
app.use('/hotels', hotelRouter);

// Make sure "/" automatically redirects to "/hotels"
app.get('/', (req, res) => {
  res.redirect(301, '/hotels');
});

// Global error handler middleware
// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack, next);
  return res.sendStatus(500);
});

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT}`));
