/* DIREÇÃO VISUAL: interações discretas e transparentes para a página Horizonte Editorial. */
(function () {
  const toast = document.querySelector('.toast');
  let timer;
  document.querySelectorAll('.demo-button').forEach((button) => {
    button.addEventListener('click', () => {
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('show'), 3600);
    });
  });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();
