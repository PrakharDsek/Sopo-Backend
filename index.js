import "dotenv/config.js";
import app from "./app.js";
import Db from "./config/db.js";

Db();

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
