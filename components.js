// ============================================
// SAE — NAV + FOOTER TEMPLATES
// ============================================

function buildNav(activePage) {
  const pages = [
    { href: 'index.html',       label: 'Beranda' },
    { href: 'about.html',       label: 'Tentang' },
    { href: 'marga.html',       label: 'Divisi' },
    { href: 'artikel.html',     label: 'Artikel' },
    { href: 'rules.html',       label: 'Rules' },
    { href: 'contact.html',     label: 'Kontak' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');
  const mLinks = pages.map(p =>
    `<a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a>`
  ).join('');

  return `
<canvas id="star-canvas"></canvas>
<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="index.html" class="nav-logo">
      <svg class="nav-logo-icon" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" stroke="url(#nl1)" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="5" fill="url(#nl2)"/>
        <ellipse cx="18" cy="18" rx="16" ry="6" stroke="rgba(0,212,255,0.45)" stroke-width="1" fill="none"/>
        <circle cx="26" cy="10" r="2" fill="#7B61FF"/>
        <circle cx="10" cy="14" r="1.5" fill="#00D4FF"/>
        <defs>
          <linearGradient id="nl1" x1="2" y1="2" x2="34" y2="34">
            <stop offset="0%" stop-color="#7B61FF"/>
            <stop offset="100%" stop-color="#00D4FF"/>
          </linearGradient>
          <linearGradient id="nl2" x1="13" y1="13" x2="23" y2="23">
            <stop offset="0%" stop-color="#7B61FF"/>
            <stop offset="100%" stop-color="#00D4FF"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="nav-logo-text">
        <span class="nav-logo-main">SAE</span>
        <span class="nav-logo-sub">Science Astronomy Education</span>
      </div>
    </a>
    <ul class="nav-links">${links}</ul>
    <div class="nav-cta">
      <a href="login.html" class="btn-nav-login">Masuk</a>
      <a href="pendaftaran.html" class="btn-nav-primary">Bergabung</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
  ${mLinks}
  <div class="mobile-menu-cta">
    <a href="login.html" class="btn btn-secondary btn-sm">Masuk</a>
    <a href="pendaftaran.html" class="btn btn-primary btn-sm">Bergabung</a>
  </div>
</div>`;
}

function buildFooter() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="url(#fl1)" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="5" fill="url(#fl2)"/>
          <ellipse cx="18" cy="18" rx="16" ry="6" stroke="rgba(0,212,255,0.45)" stroke-width="1" fill="none"/>
          <defs>
            <linearGradient id="fl1" x1="2" y1="2" x2="34" y2="34">
              <stop offset="0%" stop-color="#7B61FF"/>
              <stop offset="100%" stop-color="#00D4FF"/>
            </linearGradient>
            <linearGradient id="fl2" x1="13" y1="13" x2="23" y2="23">
              <stop offset="0%" stop-color="#7B61FF"/>
              <stop offset="100%" stop-color="#00D4FF"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="footer-logo-main">SAE</span>
      </div>
      <p class="footer-desc">Science Astronomy Education — komunitas astronomi modern yang menghadirkan pengetahuan luar angkasa untuk generasi berikutnya.</p>
      <div class="footer-social">
        <a href="#" class="social-icon" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.986l6.3-1.651C8.025 23.355 9.969 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.863 0-3.597-.512-5.079-1.4l-.364-.216-3.736.979.997-3.645-.237-.375C2.574 15.639 2 13.879 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        </a>
        <a href="#" class="social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" class="social-icon" aria-label="Discord">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.112 18.1.122 18.118a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Navigasi</h4>
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="about.html">Tentang SAE</a></li>
        <li><a href="marga.html">Divisi & Marga</a></li>
        <li><a href="artikel.html">Artikel</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Komunitas</h4>
      <ul>
        <li><a href="rules.html">Rules SAE</a></li>
        <li><a href="pendaftaran.html">Pendaftaran</a></li>
        <li><a href="contact.html">Kontak</a></li>
        <li><a href="login.html">Login Member</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Jam Operasional</h4>
      <ul>
        <li><a href="#">Buka: 05.00 WIB</a></li>
        <li><a href="#">Tutup: 21.00 WIB</a></li>
        <li><a href="#">Senin — Minggu</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 SAE — Science Astronomy Education. Dibuat dengan semangat eksplorasi.</p>
    <div class="footer-op-badge">
      <span class="dot" style="background:var(--purple)"></span>
      Operasional 05.00 — 21.00 WIB
    </div>
  </div>
</footer>`;
}
