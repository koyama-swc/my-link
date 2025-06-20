// Fetch links and render buttons
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
      a.innerHTML = `
        <i class="fa-solid ${link.icon} icon"></i>
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;">
          <span class="label">${link.label}</span>
          <span class="sub">${link.sub}</span>
        </div>`;
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

document.addEventListener('DOMContentLoaded', () => {
  loadLinks();
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(console.error);
  }
});
