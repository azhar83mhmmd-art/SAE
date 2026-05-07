// ============================================
// SAE — PENDAFTARAN JS
// ============================================

const WA_GROUP_LINK = 'https://chat.whatsapp.com/HIanm879HbnJuA53qAt7vx';

let currentStep = 1;
let photoDataUrl = null;

// ── Step Navigation ───────────────────────────
function nextStep(to) {
  if (!validateStep(currentStep)) return;
  goToStep(to);
}

function prevStep(to) {
  goToStep(to);
}

function goToStep(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
  // Show target step
  const target = document.getElementById('step' + step);
  if (target) target.classList.add('active');

  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    if (s === step) el.classList.add('active');
    if (s < step) el.classList.add('done');
  });

  // Update progress bar
  const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';

  currentStep = step;

  // If going to step 3, build summary
  if (step === 3) buildSummary();

  // Scroll to top of form
  const wrap = document.querySelector('.reg-container');
  if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Validation ────────────────────────────────
function validateStep(step) {
  let valid = true;
  clearErrors();

  if (step === 1) {
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const wa = document.getElementById('wa').value.trim();
    const umur = document.getElementById('umur').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!nama) { showError('errNama', 'Nama lengkap wajib diisi'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('errEmail', 'Email tidak valid'); valid = false; }
    if (!wa || !/^0[0-9]{8,12}$/.test(wa.replace(/\s/g, ''))) { showError('errWa', 'Nomor WhatsApp tidak valid (awali dengan 0)'); valid = false; }
    if (!umur || umur < 10 || umur > 99) { showError('errUmur', 'Umur harus antara 10–99'); valid = false; }
    if (!gender) { showError('errGender', 'Pilih gender terlebih dahulu'); valid = false; }
  }

  if (step === 2) {
    const planet = document.getElementById('planet').value;
    const minat = document.getElementById('minat').value;
    const divisi = document.getElementById('divisi').value;
    const alasan = document.getElementById('alasan').value.trim();

    if (!planet) { showError('errPlanet', 'Pilih planet favorit kamu'); valid = false; }
    if (!minat) { showError('errMinat', 'Pilih minimal 1 minat astronomi'); valid = false; }
    if (!divisi) { showError('errDivisi', 'Pilih divisi/marga kamu'); valid = false; }
    if (!alasan || alasan.length < 20) { showError('errAlasan', 'Ceritakan alasanmu minimal 20 karakter'); valid = false; }
  }

  return valid;
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  // Shake effect on invalid input nearby
  const input = el && el.previousElementSibling;
  if (input && (input.classList.contains('form-input') || input.classList.contains('radio-group') || input.classList.contains('planet-selector'))) {
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
  }
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
}

// ── Planet Selector ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Planet single select
  document.querySelectorAll('.planet-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.planet-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      document.getElementById('planet').value = opt.dataset.val;
    });
  });

  // Minat multi select
  document.querySelectorAll('.minat-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const selected = [...document.querySelectorAll('.minat-opt.selected')].map(o => o.dataset.val);
      document.getElementById('minat').value = selected.join(', ');
    });
  });

  // Make sure reveal works for form steps
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});

// ── Photo Upload ──────────────────────────────
function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran foto maksimal 5MB!');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    photoDataUrl = e.target.result;
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = `
      <img src="${photoDataUrl}" alt="Preview" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--purple);margin-bottom:10px;box-shadow:0 0 20px var(--purple-glow)"/>
      <p class="upload-label" style="color:var(--cyan)">Foto berhasil dipilih ✓</p>
      <p class="upload-hint">Klik untuk ganti foto</p>
    `;
    buildSummary();
  };
  reader.readAsDataURL(file);
}

// ── Build Summary ─────────────────────────────
function buildSummary() {
  const summary = document.getElementById('regSummary');
  const content = document.getElementById('summaryContent');
  if (!summary || !content) return;

  const data = {
    'Nama': document.getElementById('nama')?.value || '-',
    'Email': document.getElementById('email')?.value || '-',
    'WhatsApp': document.getElementById('wa')?.value || '-',
    'Umur': document.getElementById('umur')?.value || '-',
    'Kelas': document.getElementById('kelas')?.value || '-',
    'Askot': document.getElementById('askot')?.value || '-',
    'Gender': document.querySelector('input[name="gender"]:checked')?.value || '-',
    'Planet Favorit': document.getElementById('planet')?.value || '-',
    'Minat': document.getElementById('minat')?.value || '-',
    'Divisi': document.getElementById('divisi')?.value || '-',
  };

  content.innerHTML = Object.entries(data).map(([k, v]) => `
    <div class="summary-item">
      <span class="summary-key">${k}</span>
      <span class="summary-val">${v}</span>
    </div>
  `).join('');

  summary.style.display = 'block';
}

// ── Submit Form ───────────────────────────────
function submitForm() {
  clearErrors();

  const agree = document.getElementById('agree');
  if (!agree.checked) {
    showError('errAgree', 'Kamu harus menyetujui rules SAE terlebih dahulu');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Mendaftarkan...
  `;

  // Simulate processing then show success
  setTimeout(() => {
    showSuccessScreen();
  }, 1500);
}

// ── Success Screen ────────────────────────────
function showSuccessScreen() {
  const nama = document.getElementById('nama')?.value || 'Anggota Baru';
  const wa = document.getElementById('wa')?.value || '';
  const divisi = document.getElementById('divisi')?.value || '';

  const formWrap = document.querySelector('.reg-form-wrap');
  if (!formWrap) return;

  formWrap.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="success-title">Pendaftaran <span class="text-gradient">Berhasil!</span> 🚀</h2>
      <p class="success-desc">
        Selamat datang di SAE, <strong>${nama}</strong>!<br>
        Kamu telah terdaftar sebagai calon anggota divisi <strong>${divisi || 'SAE'}</strong>.<br>
        Langkah terakhir — bergabunglah ke grup WhatsApp komunitas SAE!
      </p>

      <div class="success-card glass-card">
        <div class="success-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.986l6.3-1.651C8.025 23.355 9.969 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.863 0-3.597-.512-5.079-1.4l-.364-.216-3.736.979.997-3.645-.237-.375C2.574 15.639 2 13.879 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        </div>
        <div class="success-card-body">
          <h4>Bergabung ke Grup WhatsApp SAE</h4>
          <p>Klik tombol di bawah untuk langsung masuk ke grup komunitas SAE dan mulai petualangan astronomimu!</p>
        </div>
      </div>

      <a href="${WA_GROUP_LINK}" target="_blank" class="btn btn-primary btn-lg success-wa-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.986l6.3-1.651C8.025 23.355 9.969 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.863 0-3.597-.512-5.079-1.4l-.364-.216-3.736.979.997-3.645-.237-.375C2.574 15.639 2 13.879 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        Gabung Grup WhatsApp SAE
      </a>

      <p class="success-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Grup aktif pukul 05.00 — 21.00 WIB · WITH SAE INCREASE KNOWLEDGE
      </p>

      <a href="index.html" class="btn btn-secondary" style="margin-top:12px">Kembali ke Beranda</a>
    </div>
  `;

  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    .success-screen { text-align:center; padding: 20px 10px; }
    .success-icon { width:88px; height:88px; border-radius:50%; background:var(--grad-main); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; box-shadow:0 0 48px var(--purple-glow); animation: successPop .5s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes successPop { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
    .success-title { font-size:clamp(1.5rem,4vw,2rem); font-family:'Poppins',sans-serif; font-weight:800; margin-bottom:14px; }
    .success-desc { color:var(--text-secondary); font-size:.95rem; line-height:1.8; margin-bottom:28px; }
    .success-desc strong { color:var(--text-primary); }
    .success-card { display:flex; align-items:flex-start; gap:16px; text-align:left; padding:20px 24px; margin-bottom:28px; }
    .success-card-icon { width:48px; height:48px; border-radius:14px; background:rgba(37,211,102,.12); border:1px solid rgba(37,211,102,.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .success-card-body h4 { font-weight:700; margin-bottom:6px; font-size:.95rem; }
    .success-card-body p { color:var(--text-secondary); font-size:.85rem; line-height:1.6; }
    .success-wa-btn { background:linear-gradient(135deg,#25d366,#128c7e) !important; display:inline-flex; align-items:center; gap:10px; width:100%; justify-content:center; font-size:1.05rem; margin-bottom:16px; }
    .success-wa-btn:hover { box-shadow:0 8px 28px rgba(37,211,102,.4) !important; }
    .success-note { display:flex; align-items:center; justify-content:center; gap:6px; color:var(--text-muted); font-size:.82rem; margin-top:4px; }
    .summary-item { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:8px 0; border-bottom:1px solid var(--border); font-size:.875rem; }
    .summary-item:last-child { border-bottom:none; }
    .summary-key { color:var(--text-secondary); font-weight:500; flex-shrink:0; }
    .summary-val { color:var(--text-primary); font-weight:600; text-align:right; word-break:break-word; }
    .form-input.shake, .radio-group.shake, .planet-selector.shake { animation: shake .35s ease; }
    @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
  `;
  document.head.appendChild(style);
}
