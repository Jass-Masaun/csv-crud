const express = require("express");
const cors = require("cors");

const routes = require("./app/routes");
const { errorHandler } = require("./app/handlers/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({ message: "api working!" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`server started at port ${PORT}`));
} else {
  module.exports = app;
}
