const express = require('express');

const server = express();
const PORT = '9090';

server.listen(PORT, () => {
    console.log(`Our Server is listenning on port ${PORT}`)
});