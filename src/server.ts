import dotenv from "dotenv";
// const dotenv = require("dotenv");

dotenv.config();

// CLUSTER => DATABASE => COLLECTION => DOCUMENTS
import mongoose from "mongoose";
import server from "./app";
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    //data bu mongoose.connect methodining Promise ning resolve parametrini bildiradi
    // The `data` parameter might not be used in this block, or it might represent some internal
    // information about the connection (though it's not typical to use `data` for this purpose).
    console.log("MongoDB connected successfully...");
    const PORT = process.env.PORT ?? 3003; // Attempts to retrieve a port number from the PORTenvironment variable.
    // If PORTis undefined, defaults to port 3003.
    server.listen(PORT, () => {
      // Starts listening for incoming HTTP  requests on the specified host and port.
      console.info(`Server is running successfully on port ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) =>
    console.log("MongoDB: Error on connection to MONGODB: ", err)
  );
