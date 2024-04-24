import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let groups = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/groups", (req, res) => {
  res.json(groups);
});


app.post("/groups", (req, res) => {
  const { name, description, createdBy } = req.body;

  
  if (!name || !description || !createdBy) {
    return res.status(400).json({ message: "Please provide name, description, and createdBy fields." });
  }

  const newGroup = {
    id: groups.length + 1,
    name,
    description,
    createdBy,
    createdAt: new Date(),
  };

  groups.push(newGroup);
  res.status(201).json(newGroup);
});

app.post("/groups/:id/join", (req, res) => {
  const groupId = parseInt(req.params.id);
  const userId = req.body.userId;

  
  const group = groups.find((g) => g.id === groupId);
  if (!group) {
    return res.status(404).json({ message: "Group not found." });
  }

  

  res.json({ message: `User ${userId} joined group ${groupId}.` });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
