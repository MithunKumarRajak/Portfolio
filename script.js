/*
  script.js — mithun's portfolio
*/
'use strict';

// ---- header scroll state ----
const header    = document.getElementById('header');
const burger    = document.getElementById('burger');
const mainNav   = document.getElementById('mainNav');
const navLinks  = document.querySelectorAll('.nav-a');
const scrollTop = document.getElementById('scrollTop');
const themeBtn  = document.getElementById('themeToggle');

// ---- theme toggle ----
const themeIcon  = themeBtn.querySelector('.theme-icon');
const themeLabel = themeBtn.querySelector('.theme-label');

function applyTheme(isClassic) {
  document.body.classList.toggle('classic', isClassic);
  themeIcon.textContent  = isClassic ? '🌙' : '☀️';
  themeLabel.textContent = isClassic ? 'Modern' : 'Classic';
  localStorage.setItem('portfolio-theme', isClassic ? 'classic' : 'modern');
}

// restore saved preference
const saved = localStorage.getItem('portfolio-theme') || 'classic';
applyTheme(saved === 'classic');

themeBtn.addEventListener('click', () => {
  const isNowClassic = !document.body.classList.contains('classic');
  applyTheme(isNowClassic);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  scrollTop.classList.toggle('show', window.scrollY > 500);
  highlightNav();
}, { passive: true });

// ---- mobile menu ----
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mainNav.classList.toggle('mobile-open');
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mainNav.classList.remove('mobile-open');
  });
});

// ---- active nav ----
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// ---- scroll to top ----
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- counter animation ----
function animateCount(el, target, duration = 1600) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.h-val[data-count]').forEach(el => {
      animateCount(el, parseInt(el.dataset.count, 10));
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });

const heroNumbers = document.querySelector('.hero-numbers');
if (heroNumbers) statsObserver.observe(heroNumbers);

// ---- scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // siblings stagger
    const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal') || []);
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.min(idx * 70, 250));
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ---- contact form ----
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcGAZiE6cAoynmBaPoqPedCFTf1H2PjL5AFymY4tx8oCYRABjnoCcR1FdXpu18lhXh/exec';

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formMsg     = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    submitBtn.disabled = true;
    formMsg.textContent = '';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(contactForm),
      });
      formMsg.textContent = "✓ Got it — I'll get back to you soon.";
      formMsg.style.color = '#4ade80';
      contactForm.reset();
      setTimeout(() => { formMsg.textContent = ''; }, 6000);
    } catch {
      formMsg.textContent = '✕ Something went wrong. Email me directly instead.';
      formMsg.style.color = '#f87171';
    } finally {
      submitBtn.innerHTML = orig;
      submitBtn.disabled = false;
    }
  });
}

// ---- profile image fallback ----
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.onerror = function () {
    const div = document.createElement('div');
    Object.assign(div.style, {
      width: '100%', height: '100%', borderRadius: '12px',
      background: 'linear-gradient(135deg, #1a1a2e, #0f1929)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Syne', sans-serif", fontSize: '48px',
      fontWeight: '800', color: '#818cf8'
    });
    div.textContent = 'MKR';
    this.replaceWith(div);
  };
}

// ---- footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- show body once ready ----
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.style.visibility = 'visible';
  });
});
/* --- PREMIUM UI FEATURES --- */

// Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && window.matchMedia('(min-width: 768px)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth delay for follower
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 50);
  });

  const hoverElements = document.querySelectorAll('a, button, .proj-card, .bento-item, .theme-toggle-btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// 3D Tilt Effect on Cards
const tiltElements = document.querySelectorAll('.proj-card, .bento-item');

if (window.matchMedia('(min-width: 768px)').matches) {
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPct = x / rect.width - 0.5;
      const yPct = y / rect.height - 0.5;
      
      // Calculate rotation based on cursor position
      const rotateX = yPct * -10; // Max 5 deg
      const rotateY = xPct * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      // Reset transform but keep it ready for reveal animations
      el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      
      // Clear inline transform after transition so CSS reveal can take over if needed
      setTimeout(() => {
        if (!el.matches(':hover')) {
          el.style.transform = '';
        }
      }, 300);
    });
  });
}
