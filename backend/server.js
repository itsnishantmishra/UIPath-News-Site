const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

// Temporary in-memory store
let newsStore = [];

// Routes
app.post('/news', (req, res) => {
    newsStore = req.body;
    console.log("POST received:", newsStore.length);
    res.json({ message: "POST success" });
});

app.put('/news', (req, res) => {
    newsStore = req.body;
    console.log("PUT received:", newsStore.length);
    res.json({ message: "PUT success" });
});

app.get('/news', (req, res) => {
    res.json(newsStore);
});

// Dynamic PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
