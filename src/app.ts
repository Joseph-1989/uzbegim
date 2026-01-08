import cors from "cors";
import express from "express";
import path from "path"; // Used to resolve paths for serving static files
import router from "./router"; // Our custom Express.js router
import routerAdmin from "./router-admin"; // Router for admin pages
import morgan from "morgan"; // Logging middleware for Express 4
import { MORGAN_FORMAT } from "./libs/config"; // Config variable holding the logging format
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import session from "express-session"; // Simple session middleware for node.js
import ConnectMongoDB from "connect-mongodb-session"; // Store sessions in MongoDB using connect-mongodb-session
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session); // Connect MongoDB session store to Express Session
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

console.log("App Loaded: MONGO_URL=", process.env.MONGO_URL);

// Handle store errors
store.on("error", function (error) {
  console.log("Session Store Error:", error);
});

// Wait for store to connect
store.on("connected", function () {
  console.log("Session Store Connected Successfully");
});

// #1-ENTRENCE
const app = express();
app.set("trust proxy", 1); // Trust first proxy (required for Cloud Run/Heroku etc)
app.use(express.static(path.join(__dirname, "public"))); // for  static files (css, js) in public folder
// Files are now served from Google Cloud Storage, no need for local uploads serving
// app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT)); // log request to console

// #2-SESSIONS
console.log("SESSION_SECRET present:", !!process.env.SESSION_SECRET);

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, // 3 HOURS
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax",
    },
    store: store,
    resave: false, // Changed from true to false (recommended)
    saveUninitialized: false, // Changed from true to false (recommended)
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

// #3-VIEWS
app.set("views", path.join(__dirname, "views")); // set views folder
app.set("view engine", "ejs"); // set template engine ejs

// #4-ROUTERS
app.use("/admin", routerAdmin); // SSR: EJS  render on server side
app.use("/", router); // SPA : REACT  render on client side

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let summaryClient = 0;
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connection & total [${summaryClient}]`);

  socket.on("disconnect", () => {
    summaryClient--;
    console.log(`Disconnection & total [${summaryClient}]`);
  });
});

export default server;

// The use method is a fundamental part of Express,
// it is used for adding middleware to the application's
// request-handling pipeline.

// In Express.js, the express.static middleware is used to serve static files
// such as images, CSS files, and JavaScript files. It's a built-in middleware
// function that takes a root directory path as an argument and serves static files
// relative to that path.
