
// ===== THEME =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// ===== MOBILE NAV =====
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');
const navClose = document.getElementById('navClose');
const navOverlay = document.getElementById('navOverlay');
function openNav() { nav.classList.add('open'); navOverlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeNav() { nav.classList.remove('open'); navOverlay.classList.remove('show'); document.body.style.overflow = ''; }
mobileToggle.addEventListener('click', openNav);
navClose.addEventListener('click', closeNav);
navOverlay.addEventListener('click', closeNav);
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav#nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ===== TYPED TEXT =====
const phrases = ['Full Stack Developer', 'Graphic Designer', 'Digital Strategist', 'Cybersecurity Enthusiast', 'CEO of Nettex IT Solutions'];
let pIndex = 0, cIndex = 0, deleting = false;
const output = document.getElementById('typedOutput');
function type() {
  const phrase = phrases[pIndex];
  output.textContent = deleting ? phrase.slice(0, cIndex--) : phrase.slice(0, cIndex++);
  if (!deleting && cIndex > phrase.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
  if (deleting && cIndex < 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length; }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// ===== COUNTERS =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const steps = 60, increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = Math.floor(current);
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-drop, .reveal-bounce').forEach(el => revealObserver.observe(el));

// =====================================================
// PROJECT DATA
// Central source of truth for every project card, its
// thumbnail image, category, and (optional) live URL.
// If `url` is null, the project is treated as unavailable
// and the modal shows "Coming Soon" instead of "Open Link".
// =====================================================
const projects = [
  {
    id: 'nettex',
    title: 'Nettex IT Solutions',
    category: 'website',
    categoryLabel: 'Business Website · Ghana',
    desc: 'Premium agency website with animated sections, service showcase, and client inquiry system.',
    image: 'myown.JPG',
    url: 'https://nettexsolution.com/',
    linkLabel: 'Visit Site'
  },
  {
    id: 'ghanashop',
    title: 'Restaurant',
    category: 'ecommerce',
    categoryLabel: 'Catering · Ghana',
    desc: 'Full-featured e-commerce platform with mobile money integration and real-time inventory.',
    image: 'project1.JPG',
    url: 'https://nettexsolution.com/',
    linkLabel: 'Visit Site'
  },
  {
    id: 'dashboard',
    title: 'Church Management System',
    category: 'webapp',
    categoryLabel: 'Web App · Ghana',
    desc: 'Analytics dashboard with real-time data, role-based access, and automated reporting.',
    image: 'project4.JPG',
    url: 'https://houseofvictorygh.web.app/',
    linkLabel: 'View WebApp'
  },
  {
    id: 'corporate-hub',
    title: 'Todallah Group',
    category: 'website',
    categoryLabel: 'Multiwebsite · Ghana',
    desc: 'Corporate website with multilingual support, team profiles, and service booking system.',
    image: 'project2.JPG',
    url: 'https://todallah.com/',
    linkLabel: 'Visit Site'
  },
  {
    id: 'delivergh',
    title: 'Catering WebApp',
    category: 'mobile',
    categoryLabel: 'Catering · Ghana',
    desc: 'Food & package delivery app with GPS tracking, driver management, and payment gateway.',
    image: 'project6.png',
    url: 'https://nettexsolution.com/',
    linkLabel: 'View App'
  },
  {
    id: 'brand-pack',
    title: 'My Brand Identity Pack',
    category: 'branding',
    categoryLabel: 'Branding · Ghana',
    desc: 'Full brand identity: logo, color palette, typography, business card, and brand guide.',
    image: 'project5.JPG',
    url: null,
    linkLabel: 'View Work'
  }
];

const projectsGrid = document.getElementById('projectsGrid');

function fallbackThumbHTML() {
  return `<div class="project-thumb-placeholder">
      <i class="fas fa-image"></i>
      <span>Project Pre Unavailable</span>
    </div>`;
}

function renderProjects() {
  projectsGrid.innerHTML = projects.map((p, i) => {
    const delay = (i * 0.06).toFixed(2);
    return `
      <div class="project-card reveal-zoom" data-cat="${p.category}" data-project-id="${p.id}" style="transition-delay:${delay}s">
        <div class="project-thumb" data-project-id="${p.id}" role="button" tabindex="0" aria-label="Pre ${p.title}">
          <img src="${p.image}" alt="${p.title}" loading="lazy"
            onerror="handleProjectImgError(this)">
          <div class="thumb-overlay"><span class="thumb-hint"><i class="fas fa-expand"></i> Pre</span></div>
        </div>
        <div class="project-body">
          <div class="project-category">${p.categoryLabel}</div>
          <div class="project-title">${p.title}</div>
          <p class="project-desc">${p.desc}</p>
          <button class="project-link" data-project-id="${p.id}" type="button">
            ${p.url ? p.linkLabel : 'Coming Soon'} <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>`;
  }).join('');

  // (re)observe reveal + hook up interactions for freshly rendered cards
  document.querySelectorAll('#projectsGrid .reveal-zoom').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.project-thumb, .project-link').forEach(el => {
    el.addEventListener('click', () => openProjectModal(el.dataset.projectId));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(el.dataset.projectId); }
    });
  });
}

function handleProjectImgError(imgEl) {
  const wrap = imgEl.closest('.project-thumb');
  if (wrap) wrap.innerHTML = fallbackThumbHTML();
}

// ===== PROJECT MODAL =====
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalImgWrap = document.getElementById('projectModalImgWrap');
const projectModalOpenLink = document.getElementById('projectModalOpenLink');
const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
const projectModalClose = document.getElementById('projectModalClose');
let activeProject = null;

function openProjectModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  activeProject = project;

  projectModalTitle.textContent = project.title;
  projectModalImgWrap.innerHTML = `<img src="${project.image}" alt="${project.title}" onerror="this.parentElement.innerHTML = '<div class=\\'modal-fallback\\'><i class=\\'fas fa-image\\'></i><span>Project Pre Unavailable</span></div>';">`;

  if (project.url) {
    projectModalOpenLink.style.display = 'inline-flex';
    projectModalOpenLink.innerHTML = `<i class="fas fa-arrow-up-right-from-square"></i> ${project.linkLabel || 'Open Link'}`;
  } else {
    projectModalOpenLink.style.display = 'inline-flex';
    projectModalOpenLink.innerHTML = `<i class="fas fa-clock"></i> Coming Soon`;
  }

  projectModalOverlay.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  projectModalOverlay.classList.remove('open');
  document.body.classList.remove('modal-open');
  activeProject = null;
}

projectModalOpenLink.addEventListener('click', () => {
  if (!activeProject) return;
  if (activeProject.url) {
    window.open(activeProject.url, '_blank', 'noopener,noreferrer');
  } else {
    if (window.Swal) {
      Swal.fire({
        icon: 'info',
        title: 'Not live yet',
        text: `${activeProject.title} doesn't have a public link available right now.`,
        confirmButtonColor: '#FF6B00',
        background: getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#120e08',
        color: getComputedStyle(document.documentElement).getPropertyValue('--text') || '#f0ece6'
      });
    }
  }
});

projectModalCloseBtn.addEventListener('click', closeProjectModal);
projectModalClose.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => {
  if (e.target === projectModalOverlay) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModalOverlay.classList.contains('open')) closeProjectModal();
});

renderProjects();

// ===== PROJECT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'block' : 'none';
    });
  });
});

// ===== GITHUB CONTRIBUTION GRAPH =====
function buildContribGraph() {
  const grid = document.getElementById('contribGrid');
  if (!grid) return;
  const weeks = 52;
  for (let w = 0; w < weeks; w++) {
    const week = document.createElement('div');
    week.className = 'gh-contrib-week';
    for (let d = 0; d < 7; d++) {
      const day = document.createElement('div');
      const lvl = Math.floor(Math.random() * 5) > 2 ? Math.floor(Math.random() * 5) : 0;
      day.className = 'gh-contrib-day' + (lvl > 0 ? ' l' + lvl : '');
      week.appendChild(day);
    }
    grid.appendChild(week);
  }
}
buildContribGraph();

// ===== CONTACT FORM =====
function submitContact() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const phone = document.getElementById('cphone').value.trim();
  const service = document.getElementById('cservice').value;
  const message = document.getElementById('cmessage').value.trim();
  const status = document.getElementById('formStatus');
  if (!fname || !email || !message) {
    status.textContent = 'Please fill in all required fields.';
    status.className = 'form-status error';
    if (window.Swal) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing information',
        text: 'Please fill in your first name, email, and message before sending.',
        confirmButtonColor: '#FF6B00',
        background: getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#120e08',
        color: getComputedStyle(document.documentElement).getPropertyValue('--text') || '#f0ece6'
      });
    }
    return;
  }
  const msg = `Hello Fredrick! My name is ${fname} ${lname}. I'm interested in: ${service || 'General Inquiry'}. ${message} Email: ${email}${phone ? ' | Phone: ' + phone : ''}`;
  window.open(`https://wa.me/233594850688?text=${encodeURIComponent(msg)}`, '_blank');
  status.textContent = '✓ Redirecting to WhatsApp...';
  status.className = 'form-status success';
  setTimeout(() => { status.textContent = ''; }, 4000);
}

// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();
