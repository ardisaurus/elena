const express = require("express");
const consola = require("consola");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Nuxt, Builder } = require("nuxt");
const app = express();
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/poll", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    () => {
      console.log("Database Connected");
    },
    err => {
      console.log("Cant connect to database " + err);
    }
  );
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/polls", require("./routers/api/polls"));
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
