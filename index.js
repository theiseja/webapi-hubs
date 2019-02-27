const express = require('express');

const server = express();
const PORT = '9090';


server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/now', (req, res) => {
    const now = new Date().toString(); // sends back the current date & time
    res.send(now);
});



// should be last in the codebase
server.listen(PORT, () => {
    console.log(`Our Server is listenning on port ${PORT}`)
});