/* ═══════════════════════════════════════════════════════════
   ASH Solutions — سكربت الموقع (Dark Luxury)
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* قائمة الجوال */
  var toggle = document.querySelector('.nav-toggle'), menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var o = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }
  /* الرابط النشط */
  var path = location.pathname.replace(/index\.html?$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-menu a[data-path]').forEach(function (a) {
    var p = a.getAttribute('data-path');
    if (p === path || (p !== '/' && path.indexOf(p) === 0)) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });
  /* حالة الهيدر عند التمرير */
  var hdr = document.querySelector('.site-header');
  addEventListener('scroll', function () { if (hdr) hdr.classList.toggle('scrolled', scrollY > 40); }, { passive: true });

  /* خطوط ذهبية منسابة على أي canvas.lines */
  document.querySelectorAll('canvas.lines').forEach(function (cv) {
    var c = cv.getContext('2d'), W, H, DPR = Math.min(devicePixelRatio || 1, 2), t = 0;
    function sz() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; c.setTransform(DPR, 0, 0, DPR, 0, 0); }
    sz(); addEventListener('resize', sz); addEventListener('load', sz);
    if (window.ResizeObserver) { try { new ResizeObserver(sz).observe(cv); } catch (e) {} }
    var N = 24, L = [];
    for (var i = 0; i < N; i++) L.push({ y: (i + 1) / (N + 1), a: 0.02 + Math.random() * 0.05, p: Math.random() * 6.28, s: 0.15 + Math.random() * 0.4, f: 0.6 + Math.random() * 1.4 });
    function d() {
      c.clearRect(0, 0, W, H); c.lineWidth = 1;
      for (var i = 0; i < N; i++) {
        var o = L[i]; c.beginPath();
        for (var x = 0; x <= W; x += 10) { var y = o.y * H + Math.sin(x * 0.0016 * o.f + t * o.s + o.p) * o.a * H + Math.sin(x * 0.004 + t * o.s * 0.6) * o.a * H * 0.4; if (x === 0) c.moveTo(x, y); else c.lineTo(x, y); }
        c.strokeStyle = 'rgba(201,163,78,' + (0.5 * (0.5 + 0.5 * Math.sin(t * 0.3 + i))).toFixed(3) + ')'; c.stroke();
      }
      if (!reduce) { t += 0.004; requestAnimationFrame(d); }
    }
    d();
  });

  /* الإمبلم: AI + تشغيل + رعاية */
  (function () {
    var cv = document.getElementById('emblem'); if (!cv) return;
    var c = cv.getContext('2d'), W, H, DPR = Math.min(devicePixelRatio || 1, 2), t = 0;
    function sz() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; c.setTransform(DPR, 0, 0, DPR, 0, 0); }
    sz(); addEventListener('resize', sz); addEventListener('load', sz);
    if (window.ResizeObserver) { try { new ResizeObserver(sz).observe(cv); } catch (e) {} }
    function d() {
      var light = document.documentElement.classList.contains('light');
      c.clearRect(0, 0, W, H);
      var cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36;
      var g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
      g.addColorStop(0, 'rgba(86,176,172,' + (light ? '.14' : '.10') + ')'); g.addColorStop(1, 'rgba(3,33,30,0)');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      var rings = [{ r: R * 0.62, n: 6, sp: .15, col: '86,176,172' }, { r: R * 0.85, n: 9, sp: -.1, col: '201,163,78' }, { r: R * 1.08, n: 12, sp: .06, col: '143,222,217' }];
      rings.forEach(function (ring, ri) {
        c.beginPath(); c.arc(cx, cy, ring.r, 0, 6.2832); c.strokeStyle = 'rgba(' + ring.col + ',' + (light ? '.30' : '.18') + ')'; c.lineWidth = 1; c.stroke();
        var nodes = [];
        for (var i = 0; i < ring.n; i++) { var a = t * ring.sp + i * 6.2832 / ring.n; var x = cx + Math.cos(a) * ring.r, y = cy + Math.sin(a) * ring.r; nodes.push([x, y]);
          c.beginPath(); c.arc(x, y, ri === 1 ? 3 : 2.2, 0, 6.2832); c.fillStyle = 'rgba(' + ring.col + ',.9)'; c.fill();
          c.beginPath(); c.arc(x, y, 7, 0, 6.2832); c.fillStyle = 'rgba(' + ring.col + ',.10)'; c.fill(); }
        for (var j = 0; j < nodes.length; j++) { var nx = nodes[(j + 1) % nodes.length]; c.beginPath(); c.moveTo(nodes[j][0], nodes[j][1]); c.lineTo(nx[0], nx[1]); c.strokeStyle = 'rgba(' + ring.col + ',' + (light ? '.16' : '.10') + ')'; c.stroke(); }
      });
      c.beginPath(); c.arc(cx, cy, R * 0.44, 0, 6.2832); c.fillStyle = light ? 'rgba(255,255,255,.82)' : 'rgba(3,33,30,.75)'; c.fill();
      c.strokeStyle = 'rgba(201,163,78,' + (light ? '.5' : '.35') + ')'; c.lineWidth = 1; c.stroke();
      var bw = R * 0.7, x0 = cx - bw / 2; c.beginPath();
      var pts = [[0, 0], [.18, 0], [.24, -.5], [.30, .85], [.36, -1], [.42, .2], [.5, 0], [.7, 0], [.76, -.35], [.82, .35], [.88, 0], [1, 0]];
      for (var k = 0; k < pts.length; k++) { var px = x0 + pts[k][0] * bw, py = cy + pts[k][1] * R * 0.26; k === 0 ? c.moveTo(px, py) : c.lineTo(px, py); }
      c.strokeStyle = light ? 'rgba(44,110,103,.95)' : 'rgba(143,222,217,.9)'; c.lineWidth = 2; c.stroke();
      if (!reduce) { t += 0.012; requestAnimationFrame(d); }
    }
    d();
  })();

  /* الكشف عند التمرير */
  if (!reduce) {
    var singles = ['section h2', 'section > .wrap > .lead', '.answer', '.slab', '.bridge', '.routing', '.gapviz', '.faq details', '.cta-band', '.page-hero .eyebrow', '.page-hero h1', '.page-hero .lead'];
    singles.forEach(function (s) { document.querySelectorAll(s).forEach(function (el) { if (!el.closest('header.hero')) el.classList.add('rv'); }); });
    ['.grid', '.pillars', '.two-col', '.incl'].forEach(function (s) {
      document.querySelectorAll(s).forEach(function (g) { Array.prototype.slice.call(g.children).forEach(function (ch, i) { ch.classList.add('rv'); ch.style.transitionDelay = (i * 0.07) + 's'; }); });
    });
    var revealAll = function () { document.querySelectorAll('.rv:not(.in)').forEach(function (el) { el.classList.add('in'); }); };
    try {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      document.querySelectorAll('.rv').forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('in'); else io.observe(el); });
      setTimeout(revealAll, 1800); addEventListener('load', function () { setTimeout(revealAll, 400); });
    } catch (e) { revealAll(); }
  }

  /* الرسم التفاعلي: الفجوة */
  var gv = document.getElementById('gvSlider');
  if (gv) {
    var inq = document.getElementById('gvInq'), rev = document.getElementById('gvRev'), iv = document.getElementById('gvInqV'), rvv = document.getElementById('gvRevV'), note = document.getElementById('gvNote');
    var upd = function () {
      var v = +gv.value;
      inq.style.height = Math.min(100, 18 + v * 0.8) + '%'; rev.style.height = (40 + v * 0.05) + '%';
      iv.textContent = Math.round(20 + v * 0.8); rvv.textContent = Math.round(38 + v * 0.07);
      note.textContent = v < 30 ? 'إنفاق منخفض: استفسارات قليلة وإيراد محدود — لسه بدري نحكم.'
        : (v < 70 ? 'زوّدت الإنفاق فارتفعت الاستفسارات بقوة — لكن الإيراد بالكاد تحرّك. الفجوة تشغيلية لا تسويقية.'
          : 'إنفاق مرتفع: استفسارات كثيرة جدًّا والإيراد شبه ثابت — المشكلة ليست في التسويق، بل فيما يحدث بعد وصول الطلب.');
    };
    gv.addEventListener('input', upd); upd();
  }

  /* تبديل الثيم Day/Night */
  var tb = document.getElementById('themeBtn');
  if (tb) {
    var setIcon = function () { tb.textContent = document.documentElement.classList.contains('light') ? '☾' : '☀'; };
    setIcon();
    tb.addEventListener('click', function () {
      var l = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('ash-theme', l ? 'light' : 'dark'); } catch (e) {}
      setIcon();
    });
  }

  /* نموذج الالتقاط */
  var form = document.getElementById('leadForm');
  if (form) {
    var ts = form.querySelector('[name="request_type"]'), pn = document.getElementById('paidNote');
    if (ts && pn) { var s = function () { pn.hidden = ts.value !== 'diagnostic'; }; ts.addEventListener('change', s); s(); }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) { if (!el.value.trim()) { ok = false; el.style.borderColor = 'var(--warn)'; } else el.style.borderColor = ''; });
      var m = document.getElementById('formMsg');
      if (!ok) { if (m) { m.textContent = 'برجاء إكمال الحقول المطلوبة.'; m.style.color = 'var(--warn)'; } return; }
      if (m) { m.textContent = 'تم استلام الطلب — سنعاود التواصل معك قريبًا.'; m.style.color = 'var(--teal-b)'; }
      form.reset(); if (ts && pn) pn.hidden = true;
    });
  }
})();
