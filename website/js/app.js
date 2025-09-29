
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
      alert('Login successful! Welcome back!');
 
    }
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (username && email && password) {
      alert('Account created successfully! Welcome to GambleBox!');

    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  if (card) {
    card.style.opacity = '0';
    setTimeout(function() {
      card.style.transition = 'opacity 0.6s ease';
      card.style.opacity = '1';
    }, 100);
  }
});