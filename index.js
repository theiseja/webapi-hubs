const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = "9090";

// parses body and adds it to req.body
server.use(express.json());  // important to have

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.get("/now", (req, res) => {
  const now = new Date().toString(); // sends back the current date & time
  res.send(now);
});

server.get("/api/hubs", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.post('/api/hubs', (req, res) => {
    //get the data off req.body
    const newHub = req.body
    //insert in db
    db.hubs.add(newHub)
    .then(dbHub => {
        res.status(201).json(dbHub);
    }).catch(({code, message}) => {
        res.status(code).json({err: message});
    })
});

// should be last in the codebase
server.listen(PORT, () => {
  console.log(`Our Server is listenning on port ${PORT}`);
});
