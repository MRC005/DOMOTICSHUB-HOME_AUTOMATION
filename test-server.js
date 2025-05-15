const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve everything inside 'dist' at the root URL
app.use(express.static(path.join(__dirname, "dist")));

// Serve index.html as the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
