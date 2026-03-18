const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let newsStore = [];

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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.use((req,res,next)=>{
    console.log("Incoming:", req.method, req.url);
    next();
});