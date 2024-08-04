require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const upload_router = require('./router/upload_router');
const fetch_router = require('./router/fetch_router');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/upload', upload_router);
app.use('/fetch', fetch_router);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('DB Error:', err);
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/fetch-random', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'fetch-random.html'));
});

app.get('/fetch-multiple-random', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'fetch-multiple-random.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'gallery.html'));
});

app.get('/gallery-pagination', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'gallery-pagination.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Route does not exist on our server');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
