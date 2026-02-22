// require("dotenv").config();
// const express = require("express");
// const cors = require('cors');
// const app = express();
// const bodyParser = require('body-parser');
// const userRouter = require("./api/users/user.router");
// app.use(cors('*'));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/users", userRouter);

// app.listen();
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const userRouter = require("./api/users/user.router");

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/designingstudioapi/users", userRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
