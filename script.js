// ============================================
// MyLink – コヤマ@SWC  |  Script v2
// ============================================

// --- Fetch links and render buttons ---
async function loadLinks() {
  try {
    const res = await fetch('links.json');
    if (!res.ok) throw new Error('links.json not found');
    const links = await res.json();
    const container = document.getElementById('links');

    links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'link-btn';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.id = `link-${link.label.toLowerCase().replace(/[\s()]/g, '-')}`;

      // Determine if icon is a brand (fa-brands) or solid (fa-solid)
      const iconPrefix = link.iconType === 'brands' ? 'fa-brands' : 'fa-solid';

      a.innerHTML = `
        <i class="${iconPrefix} ${link.icon} icon"></i>
        <div class="link-text">
          <span class="label">${link.label}</span>
          <span class="sub">${link.sub}</span>
        </div>
        <i class="fa-solid fa-chevron-right arrow"></i>`;

      // 背景画像が指定されていれば適用
      if (link.bg) {
        a.classList.add('has-bg');
        a.style.setProperty('--bg', `url(${link.bg})`);
      }

      li.appendChild(a);
      container.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// --- Particle animation ---
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const PARTICLE_COUNT = 40;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 0, 43, ${p.opacity})`;
      ctx.fill();

      // Move
      p.x += p.dx;
      p.y += p.dy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadLinks();
  initParticles();

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(console.error);
  }
});
