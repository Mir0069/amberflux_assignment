require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// routes
app.use("/agents", require("./routes/agentRoutes"));
app.use("/usage", require("./routes/usageRoutes"));
app.use("/audit-log", require("./routes/auditRoutes"));
app.use(
  "/improvement-suggestions",
  require("./routes/suggestionRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});