/* ============================================================
   iMpact Inc — interaction layer (vanilla, no dependencies)
   Page is fully readable without JavaScript.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* sticky nav */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function setMenu(open) {
    nav.setAttribute("data-open", String(open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setMenu(nav.getAttribute("data-open") !== "true");
  });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* scroll reveal */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* animated counters */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.innerHTML = target + "<small>" + suffix + "</small>"; return; }
    var dur = 1600, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.innerHTML = val + "<small>" + suffix + "</small>";
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* process tabs */
  var tabs = document.querySelectorAll('.tab[role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    });
  });

  function initCarouselLoop(track, prevBtn, nextBtn, itemSelector) {
    var items = Array.from(track.querySelectorAll(itemSelector));
    if (items.length < 2) return;

    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    var firstClone = items[0].cloneNode(true);
    var lastClone = items[items.length - 1].cloneNode(true);
    track.insertBefore(lastClone, track.firstChild);
    track.appendChild(firstClone);

    var index = 1;
    var scrolling = false;

    function itemWidth() {
      return items[0].getBoundingClientRect().width + gap;
    }

    function jumpTo(idx) {
      track.style.scrollBehavior = 'auto';
      track.style.scrollSnapType = 'none';
      track.scrollLeft = idx * itemWidth();
      track.style.scrollSnapType = '';
    }

    function scrollTo(idx) {
      scrolling = true;
      track.style.scrollSnapType = 'none';
      track.scrollTo({ left: idx * itemWidth(), behavior: 'smooth' });
      window.setTimeout(function () {
        normalizeIndex();
        track.style.scrollSnapType = '';
        scrolling = false;
      }, 400);
    }

    function normalizeIndex() {
      if (index === 0) {
        index = items.length;
        jumpTo(index);
      } else if (index === items.length + 1) {
        index = 1;
        jumpTo(index);
      }
    }

    prevBtn.addEventListener('click', function () {
      if (scrolling) return;
      index -= 1;
      scrollTo(index);
    });

    nextBtn.addEventListener('click', function () {
      if (scrolling) return;
      index += 1;
      scrollTo(index);
    });

    window.requestAnimationFrame(function () {
      jumpTo(index);
    });
  }

  var teamTrack = document.querySelector('.team__grid');
  var teamPrev = document.getElementById('teamPrev');
  var teamNext = document.getElementById('teamNext');
  if (teamTrack && teamPrev && teamNext) {
    initCarouselLoop(teamTrack, teamPrev, teamNext, '.member');
  }

  var clientTrack = document.querySelector('.clients__row');
  var clientPrev = document.getElementById('clientsPrev');
  var clientNext = document.getElementById('clientsNext');
  if (clientTrack && clientPrev && clientNext) {
    initCarouselLoop(clientTrack, clientPrev, clientNext, '.client-logo');
  }

  /* contact form */
  var form = document.getElementById("contactForm");
  if (form) {
    var statusEl = document.getElementById("formStatus");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mark(input, bad) {
      input.closest(".field").classList.toggle("field--error", bad);
      input.setAttribute("aria-invalid", bad ? "true" : "false");
    }
    function showStatus(type, msg) {
      statusEl.className = "form__status show " + type;
      statusEl.textContent = msg;
    }
    // clear a field's error as the user fixes it
    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field--error");
      if (field) { e.target.closest(".field").classList.remove("field--error"); e.target.setAttribute("aria-invalid", "false"); }
    });

    var checks = [
      { name: "name", ok: function (v) { return v.trim().length > 0; } },
      { name: "email", ok: function (v) { return emailRe.test(v.trim()); } },
      { name: "message", ok: function (v) { return v.trim().length > 1; } }
    ];

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements["botcheck"] && form.elements["botcheck"].value) return; // spam bot
      var valid = true, firstBad = null;
      checks.forEach(function (c) {
        var el = form.elements[c.name];
        var good = c.ok(el.value);
        mark(el, !good);
        if (!good && !firstBad) firstBad = el;
        if (!good) valid = false;
      });
      if (!valid) { showStatus("err", "Please fix the highlighted fields."); if (firstBad) firstBad.focus(); return; }
      send();
    });

    function send() {
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.innerHTML;
      var endpoint = form.getAttribute("action");
      var keyEl = form.elements["access_key"];
      var configured = endpoint && (!keyEl || keyEl.value.indexOf("YOUR-ACCESS-KEY") === -1);

      btn.setAttribute("aria-busy", "true");
      btn.textContent = "Sending…";

      // Demo mode — no endpoint/key set yet
      if (!configured) {
        setTimeout(function () {
          btn.innerHTML = original; btn.removeAttribute("aria-busy"); form.reset();
          showStatus("ok", "Looks good! Add your form endpoint (see README) and this message will be delivered to your inbox.");
        }, 700);
        return;
      }

      fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          btn.innerHTML = original; btn.removeAttribute("aria-busy");
          if (res.ok) { form.reset(); showStatus("ok", "Thanks for reaching out — we'll reply within one working day."); }
          else { showStatus("err", (res.d && res.d.message) || "Something went wrong. Please email hello@impactinc.co."); }
        })
        .catch(function () {
          btn.innerHTML = original; btn.removeAttribute("aria-busy");
          showStatus("err", "Network error — please email hello@impactinc.co directly.");
        });
    }
  }
})();
