// assets/js/main.js
// ---- Theme Toggle ----
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const userPref = localStorage.getItem('theme');

// ---- Scroll Reveal Animation ----
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  for (let i = 0; i < reveals.length; i++) {
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 40;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('visible');
    } else {
      reveals[i].classList.remove('visible');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
}

if (userPref === 'light') {
  setTheme('light');
} else {
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light')) {
      setTheme('dark');
      alert('SWITCH TO THE DARK MODE!')
    } else {
      setTheme('light');
    }
  });
}

// ---- Load Data into Page ----
function loadHero() {
  document.getElementById('hero-name').textContent = portfolioData.name;
  document.getElementById('hero-title').textContent = portfolioData.title;
  document.getElementById('hero-tagline').textContent = portfolioData.tagline;
}

function loadSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = portfolioData.skills.map(skill => `
    <div>
      <div class="flex justify-between mb-2 text-sm">
        <span>${skill.name}</span>
        <span style="color: var(--accent)">${skill.level}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-width="${skill.level}"></div>
      </div>
    </div>
  `).join('');
}

function loadProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = portfolioData.projects.map(p => `
    <div class="card project-card reveal" data-cat="${p.cat}">
      <div class="project-thumb">${p.emoji}</div>
      <div class="p-6">
        <h3 class="font-bold text-lg mb-2">${p.title}</h3>
        <p class="text-sm mb-4" style="color:#666">${p.desc}</p>
        <div class="flex flex-wrap gap-2">
          ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function loadExperience() {
  const container = document.getElementById('experience-container');
  container.innerHTML = portfolioData.experience.map(e => `
    <div class="timeline-item reveal">
      <div class="card p-6">
        <h3 class="font-bold text-lg">${e.role}</h3>
        <div class="text-sm mb-2" style="color: var(--accent)">${e.company}</div>
        <span class="mono text-xs" style="color:#888">${e.year}</span>
        <p class="text-sm mt-2" style="color:#666">${e.desc}</p>
      </div>
    </div>
  `).join('');
}

function loadContact() {
  document.getElementById('contact-email').textContent = portfolioData.email;
  document.getElementById('contact-github').textContent = portfolioData.github;
  document.getElementById('contact-linkedin').textContent = portfolioData.linkedin;
}

// ---- Interactions (Controller logic) ----
function sendMessage() {
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const msg = document.getElementById('form-message').value;
  if (!name || !email || !msg) { alert('Please fill all fields.'); return; }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
  document.getElementById('form-name').value = '';
  document.getElementById('form-email').value = '';
  document.getElementById('form-message').value = '';
}

function filterProjects(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-filter="${cat}"]`).classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.opacity = match ? '1' : '0.2';
    card.style.transform = match ? '' : 'scale(0.95)';
    card.style.transition = 'opacity 0.4s, transform 0.4s';
  });
}

function toggleMobile() { document.getElementById('mobile-menu').classList.toggle('open'); }
function closeMobile() { document.getElementById('mobile-menu').classList.remove('open'); }

// ---- Scroll Animations ----
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => bar.style.width = bar.dataset.width + '%', 200);
        });
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- Typed Text ----
function initTyped() {
  const phrases = [`> Hello, I'm ${portfolioData.name}`, '> I build cool stuff.', '> Let\'s work together!'];
  let pi = 0, ci = 0, del = false;
  function type() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const phrase = phrases[pi];
    el.textContent = del ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);
    if (!del && ci === phrase.length) { del = true; setTimeout(type, 2000); return; }
    if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, del ? 40 : 80);
  }
  type();
}

// ---- Run Everything ----
document.addEventListener('DOMContentLoaded', () => {
  loadHero();
  loadSkills();
  loadProjects();
  loadExperience();
  loadContact();
  initAnimations();
  initTyped();
});