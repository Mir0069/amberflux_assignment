require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const seedAgents = require("./seed/seedAgents");

const agentRoutes = require("./routes/agentRoutes");
const usageRoutes = require("./routes/usageRoutes");
const auditRoutes = require("./routes/auditRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/agents", agentRoutes);

app.use("/usage", usageRoutes);

app.use("/audit-log", auditRoutes);

app.use("/improvement-suggestions", suggestionRoutes);

seedAgents();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});