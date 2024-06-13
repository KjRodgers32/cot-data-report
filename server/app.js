const express = require("express");
const cors = require("cors");
const PairsRouter = require("./src/routes/PairsRoutes");
const GBPRouter = require("./src/routes/GBPRoutes");
const AUDRouter = require("./src/routes/AUDRoutes");
const CADRouter = require("./src/routes/CADRoutes");
const EURRouter = require("./src/routes/EURRoutes");
const NZRouter = require("./src/routes/NZRoutes");
const USDRouter = require("./src/routes/USDRoutes");
const JPYRouter = require("./src/routes/JPYRoutes");
const CHFRouter = require("./src/routes/CHFRoutes");
const XAURouter = require("./src/routes/XAURoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// Routes
app.use("/api/v1/", PairsRouter);
app.use("/api/v1/gbp", GBPRouter);
app.use("/api/v1/aud", AUDRouter);
app.use("/api/v1/cad", CADRouter);
app.use("/api/v1/eur", EURRouter);
app.use("/api/v1/nz", NZRouter);
app.use("/api/v1/usd", USDRouter);
app.use("/api/v1/jpy", JPYRouter);
app.use("/api/v1/chf", CHFRouter);
app.use("/api/v1/xau", XAURouter);

module.exports = app;
