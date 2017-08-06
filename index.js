const express = require('express');
const http = require('http')
const app = express();

// Routes Setup

app.get('/', (req, res) => {
	res.send({
		hi: 'there'
	});
});

// Server Setup

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);