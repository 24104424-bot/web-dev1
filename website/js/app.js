
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'home.html';
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    window.location.href = 'home.html';
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
  
  const homeCards = document.querySelectorAll('.home-card');
  if (homeCards.length > 0) {
    homeCards.forEach(function(card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(function() {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });
  }
  
  const infoSections = document.querySelectorAll('.info-section');
  if (infoSections.length > 0) {
    infoSections.forEach(function(section, index) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      setTimeout(function() {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100 + (index * 150));
    });
  }
});