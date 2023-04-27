import mongoose from "mongoose";
import "dotenv/config.js";
import "dotenv/config.js";

const Db = () => {
  mongoose
    .connect(process.env.DB, {
      dbName: "SOPO",
    })
    .then((client) => console.log("Server is connected"))
    .catch((error) => console.log(error));
};

export default Db;
