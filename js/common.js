// mrmickfly — utilidades comunes

export const CONTACT = {
  whatsapp: '+593985210501',
  email: 'info@fly.mrmickwhite.com',
  city: 'Salinas, Santa Elena',
  country: 'Ecuador',
};

export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

export function formatWhatsAppLink(message) {
  const text = encodeURIComponent(message || 'Hola, quiero información sobre el servicio técnico de drones.');
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
}

export function initWhatsAppLinks() {
  $$('[data-wa-link]').forEach(el => {
    const message = el.dataset.message;
    el.href = formatWhatsAppLink(message);
    el.target = '_blank';
    el.rel = 'noopener';
  });
  $$('[data-email-link]').forEach(el => {
    el.href = `mailto:${CONTACT.email}`;
  });
}

export function initHeaderScroll() {
  const header = $('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

export function initNavToggle() {
  const toggle = $('[data-nav-toggle]');
  const nav = $('[data-main-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  $$('a', nav).forEach(link => link.addEventListener('click', () => nav.classList.remove('is-open')));
}

export function initReveal() {
  const items = $$('.reveal:not(.is-visible)');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(item => io.observe(item));
}

export function initFaq() {
  $$('[data-faq]').forEach(item => {
    const question = $('.faq-question', item);
    const answer = $('.faq-answer', item);
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      $$('[data-faq]').forEach(other => {
        other.classList.remove('is-open');
        $('.faq-answer', other).style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

export function initYear() {
  const el = $('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}

export function bootBase() {
  initHeaderScroll();
  initNavToggle();
  initWhatsAppLinks();
  initYear();
}
