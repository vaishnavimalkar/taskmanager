// GET all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(task => task.id != req.params.id);
  writeTasks(tasks);
  res.sendStatus(204);
});
