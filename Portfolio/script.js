/* script.js
   Typing animation, tab switching, AOS init, skill animation and interactions.
*/

// Typing animation for the name (accessible)
const nameText = "Hi, I'm Zubair Pathan";
const typedEl = document.getElementById('typed-name');
let idx = 0;

function typeName() {
  if (!typedEl) return;
  if (idx <= nameText.length) {
    typedEl.textContent = nameText.slice(0, idx);
    idx++;
    setTimeout(typeName, 55);
  } else {
    // append blinking caret
    const caret = document.createElement('span');
    caret.textContent = ' |';
    caret.style.opacity = '0.7';
    caret.style.marginLeft = '6px';
    typedEl.appendChild(caret);
    setInterval(() => { caret.style.opacity = caret.style.opacity === '0' ? '0.7' : '0'; }, 600);
  }
}
document.addEventListener('DOMContentLoaded', typeName);

// Tabs logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const id = btn.dataset.tab;
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
  });
});

// Open tabs panel from hero CTA
document.getElementById('openTabs')?.addEventListener('click', () => {
  const el = document.querySelector('.tabs-panel');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.animate([{ boxShadow: '0 0 0 rgba(127,90,240,0)' }, { boxShadow: '0 20px 60px rgba(127,90,240,0.08)' }], { duration: 800 });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    // allow anchor if target not found
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Animate skill bars when they appear using IntersectionObserver
function animateSkillsOnce() {
  const skillEls = document.querySelectorAll('.skill-level');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.dataset.level || '0%';
        el.style.width = level;
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  skillEls.forEach(s => io.observe(s));
}
document.addEventListener('DOMContentLoaded', () => {
  animateSkillsOnce();
  // initialize AOS if loaded
  if (window.AOS) AOS.init({ duration: 900, once: false });
});
