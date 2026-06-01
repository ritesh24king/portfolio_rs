// About Page Specific Javascript

document.addEventListener('DOMContentLoaded', () => {
  animateProgressBars();
});

// Animate language progress bars when they come into viewport
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  if (progressBars.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.width = width;
        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}
