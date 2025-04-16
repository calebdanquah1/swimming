document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu a');
  
  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
    
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
  }
  
  // Hamburger click
  hamburger.addEventListener('click', toggleMenu);
  
  // Menu link clicks - smooth scroll
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default jump behavior
      
      // Close menu if mobile
      if (window.innerWidth < 768) {
        toggleMenu();
      }
      
      // Get target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Smooth scroll to section
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Close menu when clicking outside (existing code)
  document.addEventListener('click', function(event) {
    const isClickInside = hamburger.contains(event.target) || menu.contains(event.target);
    if (!isClickInside && menu.classList.contains('menu--active')) {
      toggleMenu();
    }
  });
});
