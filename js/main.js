// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // WhatsApp buttons
  document.querySelectorAll('[data-wa]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const msg = encodeURIComponent(this.getAttribute('data-wa'));
      window.open('https://wa.me/905302609676?text=' + msg, '_blank');
    });
  });

  // Phone buttons
  document.querySelectorAll('[data-tel]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.location.href = 'tel:' + this.getAttribute('data-tel');
    });
  });

  // Contact form -> WhatsApp
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const people = document.getElementById('people').value;
      const tour = document.getElementById('tour').value;
      const message = document.getElementById('message').value;

      let text = 'Merhaba, tekne turu rezervasyonu yapmak istiyorum.%0A%0A';
      text += '*Ad Soyad:* ' + name + '%0A';
      text += '*Telefon:* ' + phone + '%0A';
      if (date) text += '*Tarih:* ' + date + '%0A';
      if (people) text += '*Kişi Sayısı:* ' + people + '%0A';
      if (tour) {
        const tourNames = {suluada:'Suluada Tekne Turu',adrasan:'Adrasan Tekne Turu',ikisi:'Her İkisini de Görmek İstiyorum'};
        text += '*Tur:* ' + (tourNames[tour]||tour) + '%0A';
      }
      if (message) text += '*Mesaj:* ' + message + '%0A';

      window.open('https://wa.me/905302609676?text=' + text, '_blank');
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, {rootMargin: '50px'});
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imgObserver.observe(img);
    });
  }
});
