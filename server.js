const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;
const DATA_FILE = './tasks.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/api/tasks', (req, res) => {
  res.json(loadTasks());
});

app.post('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(task => task.id != req.params.id);
  saveTasks(tasks);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
