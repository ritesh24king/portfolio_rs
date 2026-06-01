// Work Page Specific Javascript - Project Filtering

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
});

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Update active button styling
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 2. Filter project cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          // Trigger a small scale-up transition
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
