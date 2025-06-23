document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('more-btn');
  const moreContent = document.getElementById('third');
  const btn2 = document.getElementById('scrolltotop');

  btn.addEventListener('mousedown', () => {
    moreContent.classList.remove('hidden');
    moreContent.scrollIntoView({ behavior: 'smooth' });
  });
btn2.addEventListener('mousedown', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  });

});



