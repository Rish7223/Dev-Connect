const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DB_connect = require("./DB_config");
// database connection
DB_connect();

// middleware
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const config = {
  origin: "*",
};
app.use(cors(config));

// setting-up routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/post"));

// serve static assets
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server has started at ${PORT}`);
});
