import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import initAPIRoute from './routes/api';
import morgan from 'morgan';
import parseurl from 'parseurl';
import session from 'express-session';


require('dotenv').config();

const app = express();
const port = process.env.PORT || 1996;

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req,res) => {
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})