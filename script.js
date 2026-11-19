/*
  script.js - mithun kumar rajak portfolio
  Senior Developer & Cybersecurity Handling Focus
*/
'use strict';

// Fallback: ensure body becomes visible even if an error occurs below
setTimeout(() => { document.body.style.visibility = 'visible'; }, 2000);

// ---- Elements ----
const header       = document.getElementById('header');
const burger       = document.getElementById('burger');
const mainNav      = document.getElementById('mainNav');
const navLinks     = document.querySelectorAll('.nav-a');
const scrollTop    = document.getElementById('scrollTop');
const themeBtn     = document.getElementById('themeToggle');
const toastBox     = document.getElementById('toastContainer');
const mobileRecruiterBtn = document.getElementById('mobileRecruiterBtn');
const mobileThemeBtn     = document.getElementById('mobileThemeToggle');

// ---- Toast Notification System ----
function showToast(message, icon = 'fa-check') {
  if (!toastBox) return;
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ---- 1-Click Copy Buttons ----
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const textToCopy = btn.dataset.copy;
    if (!textToCopy) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      showToast(`Copied to clipboard: ${textToCopy}`, 'fa-copy');
    } catch (err) {
      showToast(`Copy failed: ${textToCopy}`, 'fa-triangle-exclamation');
    }
  });
});

// ---- Theme Toggle ----
const themeIcon  = themeBtn ? themeBtn.querySelector('.theme-icon') : null;
const themeLabel = themeBtn ? themeBtn.querySelector('.theme-label') : null;

function applyTheme(isClassic) {
  document.body.classList.toggle('classic', isClassic);
  if (themeIcon) themeIcon.textContent  = isClassic ? '🌙' : '☀️';
  if (themeLabel) themeLabel.textContent = isClassic ? 'Modern' : 'Classic';
  // Sync mobile theme toggle
  if (mobileThemeBtn) {
    const mIcon = mobileThemeBtn.querySelector('.theme-icon');
    const mLabel = mobileThemeBtn.querySelector('.theme-label');
    if (mIcon) mIcon.textContent = isClassic ? '🌙' : '☀️';
    if (mLabel) mLabel.textContent = isClassic ? 'Modern' : 'Classic';
  }
  localStorage.setItem('portfolio-theme', isClassic ? 'classic' : 'modern');
}

// Restore saved preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'modern';
applyTheme(savedTheme === 'classic');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isNowClassic = !document.body.classList.contains('classic');
    applyTheme(isNowClassic);
  });
}
if (mobileThemeBtn) {
  mobileThemeBtn.addEventListener('click', () => {
    const isNowClassic = !document.body.classList.contains('classic');
    applyTheme(isNowClassic);
  });
}

// ---- Header Scroll & Scroll to Top ----
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 500);
  highlightNav();
}, { passive: true });

if (scrollTop) {
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Mobile Menu ----
if (burger && mainNav) {
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
}

// ---- Active Navigation Highlight ----
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// ---- Recruiter Fast-Track Modal ----
const recruiterModal       = document.getElementById('recruiterModal');
const recruiterNavBtn      = document.getElementById('recruiterModalBtn');
const heroRecruiterBtn     = document.getElementById('heroRecruiterBtn');
const contactRecruiterBtn  = document.getElementById('contactRecruiterBtn');
const modalCloseBtn        = document.getElementById('modalCloseBtn');

function openRecruiterModal() {
  if (!recruiterModal) return;
  recruiterModal.classList.add('active');
  recruiterModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeRecruiterModal() {
  if (!recruiterModal) return;
  recruiterModal.classList.remove('active');
  recruiterModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (recruiterNavBtn) recruiterNavBtn.addEventListener('click', openRecruiterModal);
if (heroRecruiterBtn) heroRecruiterBtn.addEventListener('click', openRecruiterModal);
if (contactRecruiterBtn) contactRecruiterBtn.addEventListener('click', openRecruiterModal);
if (mobileRecruiterBtn) {
  mobileRecruiterBtn.addEventListener('click', () => {
    if (burger) burger.classList.remove('open');
    if (mainNav) mainNav.classList.remove('mobile-open');
    openRecruiterModal();
  });
}
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRecruiterModal);

if (recruiterModal) {
  recruiterModal.addEventListener('click', (e) => {
    if (e.target === recruiterModal) closeRecruiterModal();
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && recruiterModal && recruiterModal.classList.contains('active')) {
    closeRecruiterModal();
  }
});

// ---- Certifications Category Filter ----
const certTabs = document.querySelectorAll('.cert-tab');
const certRows = document.querySelectorAll('.cert-row');

certTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    certTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const cat = tab.dataset.cat;
    certRows.forEach(row => {
      if (cat === 'all' || row.dataset.cat === cat) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });
  });
});

// ---- Interactive Cyber Terminal / Security Lab ----
const terminalBody  = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');
const terminalSend  = document.getElementById('terminalSend');
const termPills     = document.querySelectorAll('.term-pill');

const COMMAND_RESPONSES = {
  'whoami': `
    <div class="term-output">
      <span class="c-hl">Mithun Kumar Rajak</span> :: Final-year B.Tech CSE (Class of 2027)<br>
      &bull; <strong>Dual Focus:</strong> Cybersecurity Operations &amp; Full-Stack AI Engineering<br>
      &bull; <strong>Education:</strong> Jagran Lakecity University, Bhopal (CGPA: 7.6 / 10)<br>
      &bull; <strong>Credentials:</strong> Google Cybersecurity Professional (8-course), Ethical Hacking Specialization<br>
      &bull; <strong>Highlights:</strong> Top 20 / 650+ teams (HackWithAI 2026), Amroha Police Cyber Cell trainee, 4 Internships<br>
      &bull; <strong>Status:</strong> <span class="c-green">Actively seeking Cybersecurity / Full-Stack Internships</span>
    </div>`,

  'nmap-recon': `
    <div class="term-output">
      <span class="c-hl">[+] Launching Nmap 7.94 Target Reconnaissance Simulation...</span><br>
      <span class="c-warn">Nmap scan report for target-lab.internal (192.168.56.102)</span><br>
      Host is up (0.00042s latency). Tested via isolated VirtualBox NAT networking.<br>
      <br>
      PORT &nbsp; &nbsp; STATE SERVICE &nbsp; &nbsp; VERSION<br>
      22/tcp &nbsp;OPEN &nbsp;ssh &nbsp; &nbsp; &nbsp; &nbsp;OpenSSH 9.2p1 Debian 2+deb12u2 (protocol 2.0)<br>
      80/tcp &nbsp;OPEN &nbsp;http &nbsp; &nbsp; &nbsp; nginx/1.24.0 (Django Reverse Proxy)<br>
      5432/tcp OPEN &nbsp;postgresql &nbsp;PostgreSQL DB 15.4<br>
      8000/tcp OPEN &nbsp;http-alt &nbsp; &nbsp;FastAPI Uvicorn Async Worker<br>
      <br>
      <span class="c-green">[✓] WAF Analysis (wafw00f): No upstream blocking detected. DNS enumeration complete via dnsrecon.</span><br>
      <span class="c-green">[✓] Password Audit (John the Ripper): Custom wordlist rule validation complete. Audit report exported.</span>
    </div>`,

  'check-pii': `
    <div class="term-output">
      <span class="c-hl">[+] ResumeScanner Local Zero-Trust PII Redaction Engine:</span><br>
      Candidate Input Stream Received: "Mithun Rajak, Phone: +91 7631882219, Email: mithunrajak.dev@gmail.com, Aadhaar: XXXX-XXXX-1234"<br>
      <br>
      <span class="c-warn">[i] Running local regex pattern matching &amp; named entity tokenization...</span><br>
      <span class="c-green">[REDACTED_NAME]</span> candidate profile sanitized.<br>
      <span class="c-green">[REDACTED_PHONE]</span> masked: +91 **********<br>
      <span class="c-green">[REDACTED_EMAIL]</span> masked: m***k.dev@gmail.com<br>
      <span class="c-green">[REDACTED_GOV_ID]</span> masked: [SECURE_HASH_PII]<br>
      <br>
      <span class="c-green">[✓] Zero PII reaches external LLM. Only sanitized skill tokens &amp; structural vectors transmitted to MCP server.</span>
    </div>`,

  'verify-certs': `
    <div class="term-output">
      <span class="c-hl">[+] Querying 11 Verified Credential Registries:</span><br>
      1. <span class="c-green">[VERIFIED]</span> Google Cybersecurity Professional (8-Course Specialization, Coursera · Aug 2024)<br>
      2. <span class="c-green">[VERIFIED]</span> Ethical Hacking Specialization (LearnKartS, Coursera · Sep 2024)<br>
      3. <span class="c-green">[VERIFIED]</span> Kali Linux Certified (Board Infinity · 2024)<br>
      4. <span class="c-green">[VERIFIED]</span> Encryption Basics (Great Learning Academy · 2024)<br>
      5. <span class="c-green">[VERIFIED]</span> Google AI Essentials (Google · Sep 2024)<br>
      6. <span class="c-green">[VERIFIED]</span> Google Prompting Essentials (Google · Apr 2025)<br>
      7. <span class="c-green">[VERIFIED]</span> Introduction to Networking (NVIDIA Training · 2025)<br>
      8. <span class="c-green">[VERIFIED]</span> Virtualization &amp; Containers - Docker (KodeKloud · Dec 2025)<br>
      9. <span class="c-green">[VERIFIED]</span> Google Cloud Arcade Facilitator Ultimate Milestone (Aug 2025)<br>
      10. <span class="c-green">[VERIFIED]</span> Technical Support Fundamentals (Google Career Certificates · 2025)<br>
      11. <span class="c-green">[VERIFIED]</span> Programming Fundamentals (Duke University · 2024)
    </div>`,

  'mitre-skills': `
    <div class="term-output">
      <span class="c-hl">[+] MITRE ATT&amp;CK Matrix &amp; Cybersec Practical Tooling:</span><br>
      &bull; <strong>Reconnaissance:</strong> whois, dnsrecon, OSINT intelligence gathering (APCSIP trained)<br>
      &bull; <strong>Initial Access &amp; Discovery:</strong> Nmap, Zenmap, wafw00f, Wireshark, tcpdump<br>
      &bull; <strong>Credential Access:</strong> John the Ripper (rule-based wordlist permutations), hash cracking<br>
      &bull; <strong>Defensive Architecture:</strong> RBAC, stateless JWT session tokens, isolated NAT virtualization (VirtualBox/Kali)<br>
      &bull; <strong>Application Security:</strong> Burp Suite proxy interception, SQLi/XSS testing, input sanitization
    </div>`,

  'contact': `
    <div class="term-output">
      <span class="c-hl">[+] Direct Outreach Channels:</span><br>
      &bull; <strong>Email:</strong> <a href="mailto:mithunrajak.dev@gmail.com" class="c-green">mithunrajak.dev@gmail.com</a><br>
      &bull; <strong>Phone:</strong> <span class="c-green">+91 7631882219</span><br>
      &bull; <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mithun-kumar-rajak/" target="_blank" rel="noopener noreferrer" class="c-hl">linkedin.com/in/mithun-kumar-rajak</a><br>
      &bull; <strong>GitHub:</strong> <a href="https://github.com/MithunKumarRajak" target="_blank" rel="noopener noreferrer" class="c-hl">github.com/MithunKumarRajak</a><br>
      &bull; <strong>Resume PDF:</strong> <a href="images/MithunKumarRajak_Resume.pdf" download class="c-warn">Download Verified Resume ↗</a>
    </div>`,

  'help': `
    <div class="term-output">
      Available simulated commands:<br>
      &bull; <span class="c-hl">whoami</span> &mdash; Candidate summary &amp; engineering profile<br>
      &bull; <span class="c-hl">nmap-recon</span> &mdash; Simulate isolated penetration testing network scan<br>
      &bull; <span class="c-hl">check-pii</span> &mdash; Run ResumeScanner local PII redaction pipeline<br>
      &bull; <span class="c-hl">verify-certs</span> &mdash; List all 11 verified professional certifications<br>
      &bull; <span class="c-hl">mitre-skills</span> &mdash; View cybersecurity tool mapping<br>
      &bull; <span class="c-hl">contact</span> &mdash; Direct phone, email, and social endpoints<br>
      &bull; <span class="c-hl">clear</span> &mdash; Clear terminal screen
    </div>`
};

function executeTerminalCommand(rawCmd) {
  if (!terminalBody) return;
  const cmd = rawCmd.trim().toLowerCase();
  if (!cmd) return;

  if (cmd === 'clear') {
    terminalBody.innerHTML = `
      <div class="term-line output-banner">
        ========================================================================<br>
        &nbsp; MITHUN KUMAR RAJAK :: CYBERSECURITY &amp; FULL-STACK TERMINAL v2.7<br>
        &nbsp; Type 'help' or click the command pills above to audit credentials.<br>
        ========================================================================
      </div>`;
    return;
  }

  // Append user input line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';
  cmdLine.innerHTML = `<span class="prompt-user">mithun@sec-workstation</span>:<span class="prompt-dir">~</span>$&nbsp;<span class="command-text">${rawCmd}</span>`;
  terminalBody.appendChild(cmdLine);

  // Determine response
  let responseHtml = '';
  if (cmd === 'nmap' || cmd.includes('nmap') || cmd.includes('pentest')) {
    responseHtml = COMMAND_RESPONSES['nmap-recon'];
  } else if (cmd === 'pii' || cmd.includes('redact') || cmd.includes('check-pii')) {
    responseHtml = COMMAND_RESPONSES['check-pii'];
  } else if (cmd === 'certs' || cmd.includes('cert') || cmd.includes('verify')) {
    responseHtml = COMMAND_RESPONSES['verify-certs'];
  } else if (cmd === 'mitre' || cmd.includes('attack') || cmd.includes('skills')) {
    responseHtml = COMMAND_RESPONSES['mitre-skills'];
  } else if (cmd === 'whoami' || cmd === 'about' || cmd === 'bio') {
    responseHtml = COMMAND_RESPONSES['whoami'];
  } else if (cmd === 'contact' || cmd === 'email' || cmd === 'hire' || cmd === 'resume') {
    responseHtml = COMMAND_RESPONSES['contact'];
  } else if (cmd === 'help') {
    responseHtml = COMMAND_RESPONSES['help'];
  } else {
    responseHtml = `
      <div class="term-output">
        <span class="c-danger">command not found: ${rawCmd}</span>. Type <span class="c-hl">'help'</span> or click the quick command pills above.
      </div>`;
  }

  const resEl = document.createElement('div');
  resEl.innerHTML = responseHtml;
  terminalBody.appendChild(resEl);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeTerminalCommand(val);
    }
  });
}

if (terminalSend && terminalInput) {
  terminalSend.addEventListener('click', () => {
    const val = terminalInput.value;
    terminalInput.value = '';
    executeTerminalCommand(val);
  });
}

termPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const cmd = pill.dataset.cmd;
    executeTerminalCommand(cmd);
  });
});

// ---- Counter Animation ----
function animateCount(el, target, duration = 1600) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
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
}, { threshold: 0.3 });

const heroNumbers = document.querySelector('.hero-numbers');
if (heroNumbers) statsObserver.observe(heroNumbers);

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal') || []);
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.min(idx * 70, 250));
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ---- Contact Form ----
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcGAZiE6cAoynmBaPoqPedCFTf1H2PjL5AFymY4tx8oCYRABjnoCcR1FdXpu18lhXh/exec';

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formMsg     = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Encrypting &amp; Sending…';
    submitBtn.disabled = true;
    formMsg.textContent = '';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(contactForm),
      });
      formMsg.textContent = "✓ Securely delivered - I'll get back to you promptly.";
      formMsg.style.color = '#4ade80';
      showToast('Message sent successfully!', 'fa-paper-plane');
      contactForm.reset();
      setTimeout(() => { formMsg.textContent = ''; }, 6000);
    } catch {
      formMsg.textContent = '✕ Something went wrong. Email me directly at mithunrajak.dev@gmail.com';
      formMsg.style.color = '#f87171';
      showToast('Transmission error. Please email directly.', 'fa-triangle-exclamation');
    } finally {
      submitBtn.innerHTML = orig;
      submitBtn.disabled = false;
    }
  });
}

// ---- Profile Image Fallback ----
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

// ---- Footer Year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Show Body Once Ready ----
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.style.visibility = 'visible';
  });
});

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && window.matchMedia('(min-width: 768px)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .proj-card, .exp-card, .term-pill, .cert-tab');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ---- 3D Tilt Effect on Project & Experience Cards ----
const tiltElements = document.querySelectorAll('.proj-card, .exp-card');

if (window.matchMedia('(min-width: 768px)').matches) {
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPct = x / rect.width - 0.5;
      const yPct = y / rect.height - 0.5;
      
      const rotateX = yPct * -6;
      const rotateY = xPct * 6;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      setTimeout(() => {
        if (!el.matches(':hover')) {
          el.style.transform = '';
        }
      }, 300);
    });
  });
}
