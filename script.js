document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('more-btn');
  const moreContent = document.getElementById('third');

  btn.addEventListener('mousedown', () => {
    moreContent.classList.remove('hidden');
    moreContent.scrollIntoView({ behavior: 'smooth' });
  });
});
