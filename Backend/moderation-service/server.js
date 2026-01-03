const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Moderation service running" });
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Moderation Service running on port ${PORT}`);
});
