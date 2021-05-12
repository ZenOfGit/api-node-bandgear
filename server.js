// This file uses http to create a server

const http = require ('http');
const app = require('./app');

const port = process.env.PORT || 3000;

// const server = http.createServer(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));