// server.js
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Simple chatbot API endpoint
app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;

  // Very simple bot logic
  let reply = "I didn't understand that.";

  if (userMessage.toLowerCase().includes("hello")) reply = "Hi! How can I help you?";
  if (userMessage.toLowerCase().includes("help")) reply = "Sure! What do you need?";

  res.json({ reply });
});

app.post("/api/upload", (req, res) => {
  const { fileName, fileType, fileData } = req.body;

  console.log("Received file:", fileName);

  // Process file (save to disk, cloud, or just send a response)
  res.json({
    reply: `File "${fileName}" received successfully!`
  });
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
