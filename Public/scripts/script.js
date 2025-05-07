const form = document.getElementById('task-form');
const openFormBtn = document.getElementById('open-form-btn');
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
const filters = document.querySelectorAll('#filter-menu button');

const VALID_STATUSES = ['pending', 'in_progress', 'completed'];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  fetchWeather();
  fetchNews();
});

openFormBtn.addEventListener('click', () => {
  form.classList.toggle('hidden');
});

filterBtn.addEventListener('click', () => {
  filterMenu.classList.toggle('open');
});

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    renderTasks(btn.dataset.filter);
    filterMenu.classList.remove('open'); // Cierra el menú después de hacer clic
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = {
    id: Date.now().toString(),
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    dueDate: formatDate(form.dueDate.value, form.dueTime.value),
    status: form.status.value
  };

  if (!task.title || !task.dueDate || !isValidDate(task.dueDate) || !VALID_STATUSES.includes(task.status)) {
    alert('Please fill in all fields correctly.');
    return;
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  form.reset();
  form.classList.add('hidden');  
});

function renderTasks(filter = 'all') {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  filtered.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <button class="delete-btn" onclick="deleteTask('${task.id}')">✖</button>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <small>Due: ${task.dueDate}</small><br>
      <small>Status: ${task.status.replace('_', ' ')}</small>
    `;
    taskList.appendChild(div);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function fetchWeather() {
  const API_KEY = 'f13f3a2796c87745b08b445bf2f9c0ee';
  const city = 'Madrid';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].main;
      const weatherEl = document.getElementById('weather');
      weatherEl.textContent = `${city}: ${temp}°C, ${condition}`;
    })
    .catch(err => {
      console.error('Error fetching weather:', err);
      const weatherEl = document.getElementById('weather');
      weatherEl.textContent = 'Weather unavailable';
    });
}

function formatDate(dateString, timeString) {
  const date = new Date(`${dateString}T${timeString}:00`);
  return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function isValidDate(dateString) {
  return !isNaN(Date.parse(dateString));
}

function fetchNews() {
  const API_KEY = '56742d322a2447ea96b54e4d07b6c942';
  const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&country=us&apiKey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('news-list');
      list.innerHTML = '';
      data.articles.slice(0, 5).forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Error fetching news:', err);
      const list = document.getElementById('news-list');
      list.innerHTML = '<li>News unavailable.</li>';
    });
}
