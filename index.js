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

server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.hubs.remove(id)
    .then(hub => {
        if (hub) {
            res.json(hub);
        } else {
            res.status(400).json({err: 'Invalid ID'});
        }
    }).catch(({code, message}) => {
        res.status(code).json({err: message});
    })
});

server.put('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    const updatedHub = req.body;

    db.hubs.update(id, updatedHub)
    .then(dbHub => {
        if (dbHub) {
            res.json(dbHub);
        } else {
            res.status(400).json({err: 'Inavild ID'});
        }
    }).catch(({code, message}) => {
        res.status(code).json({err: message});
    });
});

server.get('/api/hubs/:id', (req, res) => {
    // get a specific hub by the id
    // send an error message if the id is invalid
    const { id } = req.params.id;

    db.hubs.findById(id)
    .then(hub => {
        if (hub) {
            res.json(hub);
        } else {
            res.status(400).json({err: 'Invalid ID'});
        }
    }).catch(({code, message}) => {
        res.status(code).json({err: message});
    })
});

// should be last in the codebase
server.listen(PORT, () => {
  console.log(`Our Server is listenning on port ${PORT}`);
});
