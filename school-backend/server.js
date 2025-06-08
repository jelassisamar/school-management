require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const parentRoutes = require("./routes/parent.routes");
const studentRoutes = require("./routes/student.routes");
const classeRoutes = require("./routes/classe.routes");
const emploiRoutes = require("./routes/emploi.routes");
const matiereRoutes = require("./routes/matiere.routes");
const absenceRoutes = require("./routes/absence.routes");
const app = express();
const path = require("path");

// Database connection
connectDB();

// Middleware
app.use(express.json());
const cors = require("cors");

// Enhanced CORS configuration
const allowedOrigins = [
  "http://localhost:8081", // Web app
  "http://localhost:5173", // React dev server
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/classe", classeRoutes);
app.use("/api/emploi", emploiRoutes);
app.use("/api/matiere", matiereRoutes);
app.use("/api/absence", absenceRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 MongoDB: ${process.env.MONGO_URI}`);
  console.log(`🌍 Allowed origins: ${allowedOrigins.join(", ")}`);
});
