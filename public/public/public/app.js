async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.name} <button onclick="deleteTask(${task.id})">Delete</button>`;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: input.value })
  });
  input.value = '';
  loadTasks();
}

async function deleteTask(id) {
  await fetch('/api/tasks/' + id, { method: 'DELETE' });
  loadTasks();
}

loadTasks();
