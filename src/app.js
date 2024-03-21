const express = require("express");
const connectDB = require("./config/db.js");
const routes = require("./routes/user.routes.js");
const auth = require("./middleware/auth.js");

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(auth.initialize());

app.use("/api/users", routes);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
