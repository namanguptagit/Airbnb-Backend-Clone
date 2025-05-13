// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());

app.use(( req, res, next) => {
  req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : 'false';
  console.log("checking cookie", req.isLoggedIn);
  next();
});


app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  } else {
    next();
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

const DB_PATH = 'Path From MongoDB';

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}
).catch((err) => {  
  console.error("Error connecting to MongoDB", err);
}
);
