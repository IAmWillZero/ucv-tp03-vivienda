/* TP03 · navegación, índice, estado, pantalla completa, visor de planos y video. Sin dependencias. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var app = $("app"), stage = $("stage");
  var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));
  var total = slides.length, current = 0;
  var KEY = "tp03-vivienda-slide";

  function store(get, val) {
    try { return get ? localStorage.getItem(KEY) : localStorage.setItem(KEY, String(val)); } catch (e) { return null; }
  }

  /* ---------- escala 16:9 ---------- */
  function fit() {
    var wrap = stage.parentElement;
    var s = Math.min(wrap.clientWidth / 1920, wrap.clientHeight / 1080);
    stage.style.transform = "scale(" + s + ")";
  }
  window.addEventListener("resize", fit);

  /* ---------- mostrar diapositiva ---------- */
  function pauseMedia() {
    stage.querySelectorAll("video").forEach(function (v) { if (!v.paused) v.pause(); });
  }
  function show(i, opts) {
    opts = opts || {};
    i = Math.max(0, Math.min(total - 1, i));
    if (i !== current) pauseMedia();
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle("active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
      s.inert = !on;
    });
    current = i;
    $("counter").textContent = (i + 1) + " / " + total;
    $("section-label").textContent = slides[i].dataset.section + " · " + slides[i].dataset.title;
    $("bar").style.width = ((i + 1) / total * 100) + "%";
    document.title = slides[i].dataset.title + " · TP03 Vivienda · Grupo A1";
    $("btn-prev").disabled = i === 0;
    $("btn-next").disabled = i === total - 1;
    markIndex();
    store(false, i);
    var hash = "#/" + (i + 1);
    if (location.hash !== hash) {
      if (opts.replace) history.replaceState(null, "", hash);
      else history.pushState(null, "", hash);
    }
  }
  function next() { if (current < total - 1) show(current + 1); }
  function prev() { if (current > 0) show(current - 1); }
  function fromHash() {
    var m = /^#\/(\d+)$/.exec(location.hash);
    return m ? parseInt(m[1], 10) - 1 : null;
  }
  window.addEventListener("popstate", function () {
    var h = fromHash();
    if (h !== null && h >= 0 && h < total) show(h, { replace: true });
  });
  window.addEventListener("hashchange", function () {
    var h = fromHash();
    if (h !== null && h !== current && h >= 0 && h < total) show(h, { replace: true });
  });

  /* ---------- índice ---------- */
  var list = $("index-list"), lastSection = null;
  slides.forEach(function (s, k) {
    if (s.dataset.section !== lastSection) {
      lastSection = s.dataset.section;
      var h = document.createElement("h4"); h.textContent = lastSection; list.appendChild(h);
    }
    var b = document.createElement("button");
    b.innerHTML = '<span class="n">' + (k + 1) + "</span><span></span>";
    b.lastChild.textContent = s.dataset.title;
    b.addEventListener("click", function () { closeIndex(); show(k); });
    list.appendChild(b);
  });
  function markIndex() {
    list.querySelectorAll("button").forEach(function (b, k) { b.setAttribute("aria-current", k === current ? "true" : "false"); });
  }
  var panel = $("index-panel");
  function openIndex() { panel.hidden = false; var c = list.querySelector('[aria-current="true"]'); (c || list.querySelector("button")).focus(); }
  function closeIndex() { panel.hidden = true; $("btn-index").focus(); }
  $("btn-index").addEventListener("click", function () { panel.hidden ? openIndex() : closeIndex(); });
  $("btn-index-close").addEventListener("click", closeIndex);
  panel.addEventListener("click", function (e) { if (e.target === panel) closeIndex(); });

  /* secciones: saltar a la primera diapositiva de la sección siguiente/anterior */
  function sectionJump(dir) {
    var sec = slides[current].dataset.section, k = current;
    if (dir > 0) { while (k < total && slides[k].dataset.section === sec) k++; if (k < total) show(k); }
    else {
      while (k > 0 && slides[k].dataset.section === sec) k--;
      var s2 = slides[k].dataset.section; while (k > 0 && slides[k - 1].dataset.section === s2) k--;
      show(k);
    }
  }

  /* ---------- reiniciar ---------- */
  function restart() { closeIndexIfOpen(); show(0); }
  function closeIndexIfOpen() { if (!panel.hidden) panel.hidden = true; }
  $("btn-restart").addEventListener("click", restart);
  $("btn-restart2").addEventListener("click", restart);

  /* ---------- pantalla completa ---------- */
  function toggleFs() {
    var d = document;
    if (!d.fullscreenElement && !d.webkitFullscreenElement) {
      var el = d.documentElement;
      (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    } else {
      (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    }
  }
  function onFs() {
    app.classList.toggle("fs", !!(document.fullscreenElement || document.webkitFullscreenElement));
    setTimeout(fit, 60);
  }
  document.addEventListener("fullscreenchange", onFs);
  document.addEventListener("webkitfullscreenchange", onFs);
  $("btn-fs").addEventListener("click", toggleFs);
  $("btn-next").addEventListener("click", next);
  $("btn-prev").addEventListener("click", prev);

  /* ---------- visor de planos ---------- */
  var viewer = $("viewer"), canvas = $("viewer-canvas"), vimg = $("viewer-img");
  var z = { s: 1, x: 0, y: 0, min: 0.1 };
  function apply() { vimg.style.transform = "translate(" + z.x + "px," + z.y + "px) scale(" + z.s + ")"; }
  function fitView() {
    var cw = canvas.clientWidth, ch = canvas.clientHeight, iw = vimg.naturalWidth, ih = vimg.naturalHeight;
    if (!iw) return;
    z.s = z.min = Math.min(cw / iw, ch / ih) * 0.98;
    z.x = (cw - iw * z.s) / 2; z.y = (ch - ih * z.s) / 2; apply();
  }
  function zoomAt(f, cx, cy) {
    var ns = Math.max(z.min, Math.min(z.min * 12, z.s * f));
    if (cx === undefined) { cx = canvas.clientWidth / 2; cy = canvas.clientHeight / 2; }
    z.x = cx - (cx - z.x) * ns / z.s; z.y = cy - (cy - z.y) * ns / z.s; z.s = ns; apply();
  }
  var opener = null;
  function openViewer(img) {
    opener = img;
    vimg.onload = fitView;
    vimg.src = img.currentSrc || img.src;
    vimg.alt = img.alt;
    $("viewer-cap").textContent = img.alt + " · rueda o +/− para ampliar, arrastra para desplazar";
    viewer.hidden = false;
    if (vimg.complete) fitView();
    $("v-close").focus();
  }
  function closeViewer() { viewer.hidden = true; vimg.removeAttribute("src"); if (opener) opener.focus(); }
  stage.addEventListener("click", function (e) {
    var t = e.target;
    if (t.tagName === "IMG" && t.hasAttribute("data-zoom")) openViewer(t);
  });
  stage.querySelectorAll("img[data-zoom]").forEach(function (im) {
    im.tabIndex = 0;
    im.setAttribute("role", "button");
    im.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); openViewer(im); } });
  });
  $("v-in").addEventListener("click", function () { zoomAt(1.4); });
  $("v-out").addEventListener("click", function () { zoomAt(1 / 1.4); });
  $("v-fit").addEventListener("click", fitView);
  $("v-close").addEventListener("click", closeViewer);
  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = canvas.getBoundingClientRect();
    zoomAt(e.deltaY < 0 ? 1.2 : 1 / 1.2, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  var pts = new Map(), last = null, pinch = null;
  canvas.addEventListener("pointerdown", function (e) { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, e); canvas.classList.add("drag"); last = e; });
  canvas.addEventListener("pointermove", function (e) {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, e);
    var r = canvas.getBoundingClientRect();
    if (pts.size === 2) {
      var a = Array.from(pts.values()), d = Math.hypot(a[0].clientX - a[1].clientX, a[0].clientY - a[1].clientY);
      var cx = (a[0].clientX + a[1].clientX) / 2 - r.left, cy = (a[0].clientY + a[1].clientY) / 2 - r.top;
      if (pinch) zoomAt(d / pinch, cx, cy);
      pinch = d; return;
    }
    if (last) { z.x += e.clientX - last.clientX; z.y += e.clientY - last.clientY; apply(); }
    last = e;
  });
  function up(e) { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { canvas.classList.remove("drag"); last = null; } else last = Array.from(pts.values())[0]; }
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("dblclick", function (e) { var r = canvas.getBoundingClientRect(); zoomAt(2, e.clientX - r.left, e.clientY - r.top); });
  window.addEventListener("resize", function () { if (!viewer.hidden) fitView(); });

  /* ---------- teclado ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (!viewer.hidden) {
      if (e.key === "Escape") { e.preventDefault(); closeViewer(); }
      else if (e.key === "+" || e.key === "=") zoomAt(1.4);
      else if (e.key === "-") zoomAt(1 / 1.4);
      else if (e.key === "0") fitView();
      return;
    }
    if (!panel.hidden) { if (e.key === "Escape") { e.preventDefault(); closeIndex(); } return; }
    if (tag === "video" && (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
    switch (e.key) {
      case "ArrowRight": case "PageDown": e.preventDefault(); next(); break;
      case " ": if (tag === "button") return; e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); show(0); break;
      case "End": e.preventDefault(); show(total - 1); break;
      case "ArrowDown": e.preventDefault(); sectionJump(1); break;
      case "ArrowUp": e.preventDefault(); sectionJump(-1); break;
      case "f": case "F": e.preventDefault(); toggleFs(); break;
      case "i": case "I": case "m": case "M": e.preventDefault(); openIndex(); break;
      case "Escape": pauseMedia(); break;
    }
  });

  /* ---------- táctil: deslizar ---------- */
  var tx = null, ty = null;
  stage.parentElement.addEventListener("touchstart", function (e) { if (e.touches.length === 1) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive: true });
  stage.parentElement.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
    if (e.target.closest("video")) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); }
  });

  /* ---------- arranque: hash > avance guardado > portada ---------- */
  fit();
  var h = fromHash(), saved = parseInt(store(true), 10);
  if (h !== null && h >= 0 && h < total) show(h, { replace: true });
  else if (saved > 0 && saved < total) {
    show(saved, { replace: true });
    var t = $("toast");
    t.innerHTML = "<span>Continuando en la diapositiva " + (saved + 1) + ".</span>";
    var b = document.createElement("button"); b.className = "tb-btn"; b.textContent = "Ir a la portada";
    b.addEventListener("click", function () { t.hidden = true; show(0); });
    t.appendChild(b); t.hidden = false;
    setTimeout(function () { t.hidden = true; }, 6000);
  } else show(0, { replace: true });
})();
