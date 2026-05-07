// ============================================
// SAE — GLOBAL JS
// ============================================

// ── Star Field ──────────────────────────────
function initStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], shootingStars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2
    };
  }

  function mkShooter() {
    return {
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
      a: 1,
      fade: Math.random() * 0.02 + 0.015,
      active: true
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: 180 }, mkStar);
    setInterval(() => {
      if (shootingStars.length < 3 && Math.random() < 0.4) {
        shootingStars.push(mkShooter());
      }
    }, 3000);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Stars
    stars.forEach(s => {
      s.a = 0.35 + Math.sin(t * s.speed + s.phase) * 0.35;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,215,255,${s.a})`;
      ctx.fill();
    });

    // Shooting stars
    shootingStars = shootingStars.filter(s => s.active);
    shootingStars.forEach(s => {
      const dx = Math.cos(s.angle) * s.len;
      const dy = Math.sin(s.angle) * s.len;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
      grad.addColorStop(0, `rgba(0,212,255,${s.a})`);
      grad.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - dx, s.y - dy);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.a -= s.fade;
      if (s.a <= 0) s.active = false;
    });

    requestAnimationFrame(draw);
  }

  init();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

// ── Navbar ──────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

// ── Scroll Reveal ────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ── Smooth counter ────────────────────────────
function animateCount(el, end, suffix = '') {
  const dur = 2000;
  const start = performance.now();
  const startVal = 0;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(startVal + (end - startVal) * ease) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const end = parseInt(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || '';
        animateCount(e.target, end, suffix);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

// ── Active nav link ───────────────────────────
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page);
  });
}

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initNavbar();
  initReveal();
  initCounters();
  setActiveNav();
});
