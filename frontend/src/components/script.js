document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
      });
    };

    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Observe the skills section
    const skillsSection = document.querySelector('section');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    // Animate skill cards on hover
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('animate-pulse');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('animate-pulse');
      });
    });
  });