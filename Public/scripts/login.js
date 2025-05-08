document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || 'Credenciales incorrectas');
        return;
      }
  
      // Guardar token en localStorage
      localStorage.setItem('token', data.token);
  
      alert('Inicio de sesión exitoso');
  
      // Redirigir al dashboard o tareas
      window.location.href = 'tasks.html';
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error de conexión con el servidor');
    }
  });
  