/* ==========================================================================
   Nestlancer Client Portal Lab — v2 UPGRADE KIT (behaviours)
   Progressively-enhancing helpers over kit.css/base.css primitives.
   No network, no framework, no generated pages. Each block guards for absence,
   so a page may use one helper or all of them.
   Public: window.nlToast(msg,opts) · window.nlINR(n,dec) · nl:filters events.
   ========================================================================== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ v2.1 boot surfaces
     Only missing surfaces are added. Existing Tier-A/Tier-B chrome is never
     replaced. All destinations below are real lab routes or C12 actions. */
  function nlFamily() {
    var m = location.pathname.match(/\/families\/(F\d\d)-[^/]+\/(V[1-5])\//);
    return m ? { id: m[1], variant: m[2] } : null;
  }
  function nlAdd(parent, html, before) {
    var t = document.createElement('template'); t.innerHTML = html.trim();
    var node = t.content.firstElementChild;
    if (before && parent.firstChild) parent.insertBefore(node, parent.firstChild); else parent.appendChild(node);
    return node;
  }
  function nlBoot() {
    var fam = nlFamily();
    if (!fam) return;
    document.documentElement.setAttribute('data-nl-family', fam.id);
    document.documentElement.setAttribute('data-nl-variant', fam.variant);
    if (!document.querySelector('.app')) {
      var shell = document.querySelector('.shell');
      if (shell) {
        shell.classList.add('app');
        if (shell.classList.contains('shell--top')) shell.classList.add('app--top');
      } else {
        document.body.classList.add('app', /^(F01|F02)$/.test(fam.id) ? 'app--auth' : 'app--top');
      }
    }
    var main = document.querySelector('main');
    if (main && !main.querySelector('[data-state-dock]')) {
      var degraded = /^(F03|F05|F08|F09)$/.test(fam.id) ? '<button type="button" data-state-switch="degraded" aria-pressed="false">Degraded 502</button>' : '';
      nlAdd(main, '<div class="nl-state-dock" data-state-dock><span>View state</span>' +
        '<div class="segmented" role="group" aria-label="Preview page state">' +
        '<button type="button" data-state-switch="live" aria-pressed="true">Live</button>' +
        '<button type="button" data-state-switch="empty" aria-pressed="false">Empty</button>' +
        '<button type="button" data-state-switch="loading" aria-pressed="false">Loading</button>' +
        '<button type="button" data-state-switch="error" aria-pressed="false">Error</button>' + degraded +
        '</div><small>Local preview · no API call</small></div>');
    }
    if (fam.id === 'F01' || fam.id === 'F02' || fam.id === 'F04') return;

    if (!$('.sheet-scrim[data-sheet-scrim]')) nlAdd(document.body, '<div class="sheet-scrim" data-sheet-scrim></div>');
    if (!document.getElementById('nl-inspector')) {
      nlAdd(document.body, '<section class="sheet sheet--wide" id="nl-inspector" data-open="false" role="dialog" aria-modal="true" aria-labelledby="nl-inspector-title">' +
        '<div class="sheet__h"><div><span class="tag">Preview · Local view</span><h2 id="nl-inspector-title" data-nl-inspect-title>Record inspector</h2>' +
        '<p data-nl-inspect-sub>Details stay in context; your filters and scroll position are preserved.</p></div>' +
        '<button class="iconb" type="button" data-close aria-label="Close inspector">×</button></div>' +
        '<div class="sheet__b" data-nl-inspect-body></div>' +
        '<div class="sheet__f"><button class="btn btn-s" type="button" data-close>Close</button>' +
        '<a class="btn btn-s" data-nl-inspect-link href="../../F03-dashboard-overview/V1/index.html">Open related workspace</a></div></section>');
    }
    var pal = $('.palette');
    if (!pal) {
      pal = nlAdd(document.body, '<div class="palette" id="nl-palette" data-open="false" role="dialog" aria-modal="true" aria-label="Search the portal" aria-hidden="true">' +
        '<div class="palette__p"><div class="palette__in"><span aria-hidden="true">⌕</span><input type="text" placeholder="Search pages, money, work and support…" aria-label="Search the portal" autocomplete="off"><kbd class="kbd">Esc</kbd></div>' +
        '<div class="palette__b"><p class="palette__g">Awaiting you</p>' +
        '<a class="palette__i" href="../../F16-checkout/V1/index.html"><span>Jump to pending payment</span><span class="r">₹30,000</span></a>' +
        '<a class="palette__i" href="../../F11-quote-details/V1/index.html"><span>Review pending quote #01a10f80</span><span class="r">₹1,770</span></a>' +
        '<a class="palette__i" href="../../F09-project-details/V1/index.html?tab=deliverables"><span>Review Khandesh Spice Milestone 2</span><span class="r">57%</span></a>' +
        '<p class="palette__g">Real actions</p>' +
        '<a class="palette__i" href="../../F06-new-request/V1/index.html"><span>New request</span><span class="r">Brief</span></a>' +
        '<a class="palette__i" href="../../F12-messages-home/V1/index.html"><span>Open messages / support thread</span><span class="r">2 unread</span></a>' +
        '<button class="palette__i" type="button" data-theme-toggle><span>Switch light / dark theme</span><span class="r">Local</span></button>' +
        '<p class="palette__g">Workspace</p>' +
        '<a class="palette__i" href="../../F03-dashboard-overview/V1/index.html"><span>Overview</span><span class="r">Work</span></a>' +
        '<a class="palette__i" href="../../F05-requests-work-hub/V1/index.html"><span>Requests</span><span class="r">26</span></a>' +
        '<a class="palette__i" href="../../F08-projects-list/V1/index.html"><span>Projects</span><span class="r">2 active</span></a>' +
        '<a class="palette__i" href="../../F10-quotes-list/V1/index.html"><span>Quotes</span><span class="r">12</span></a>' +
        '<a class="palette__i" href="../../F14-billing/V1/index.html"><span>Billing</span><span class="r">₹31,875 open</span></a>' +
        '<a class="palette__i" href="../../F18-invoices/V1/index.html"><span>Invoices</span><span class="r">45</span></a>' +
        '<a class="palette__i" href="../../F19-notifications/V1/index.html"><span>Notifications</span><span class="r">6 unread</span></a>' +
        '<a class="palette__i" href="../../F21-settings/V1/index.html"><span>Settings &amp; activity</span><span class="r">Account</span></a>' +
        '<a class="palette__i" href="../../F23-explore/V1/index.html"><span>Articles &amp; studio work</span><span class="r">Explore</span></a>' +
        '<p class="palette__none" hidden>No matching destination. Try “quote”, “payment”, “project” or “request”.</p></div>' +
        '<div class="palette__f"><span><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> navigate</span><span><kbd class="kbd">↵</kbd> open</span><span><kbd class="kbd">Esc</kbd> close</span><span style="margin-left:auto">C12 · real destinations only</span></div></div></div>');
    }
    if (!pal.id) pal.id = 'nl-palette';
    if (!$('[data-palette-open]')) {
      var trigger = '<div class="nl-inline-palette"><button class="trigger" type="button" data-palette-open="' + pal.id + '" aria-label="Search the portal, Command K"><span>Search workspace</span><kbd class="kbd">⌘K</kbd></button>' +
        '<details class="nl-quick"><summary class="iconb" aria-label="Quick create">+</summary><div class="nl-quick__pop"><p class="menu__h">Quick create / open</p><a href="../../F06-new-request/V1/index.html">New request</a><a href="../../F12-messages-home/V1/index.html">Open support</a></div></details></div>';
      var host = $('.topbar-in,header.hdr,header.top,.topbar,.bar');
      if (host) {
        nlAdd(host, trigger);
      } else if (main) {
        var theme = $('[data-theme-toggle]') ? '' : '<button class="fbtn" type="button" data-theme-toggle aria-label="Switch theme">Theme</button>';
        var bar = nlAdd(main, '<header class="nl-commandbar"><details class="nl-workspace"><summary class="nl-commandbar__id"><span class="ws__mark">N</span><span>Khandesh Spice<small>Client workspace</small></span></summary>' +
          '<div class="nl-workspace__pop"><b>Khandesh Spice</b><p>Arjun Mehta · Owner</p><dl><div><dt>Active projects</dt><dd>2</dd></div><div><dt>Pending</dt><dd>₹31,875</dd></div></dl><a href="../../F20-profile/V1/index.html">Manage workspace profile →</a></div></details>' +
          '<nav class="nl-commandbar__links" aria-label="Workspace"><a href="../../F03-dashboard-overview/V1/index.html">Overview</a><a href="../../F05-requests-work-hub/V1/index.html">Requests</a><a href="../../F08-projects-list/V1/index.html">Projects</a><a href="../../F14-billing/V1/index.html">Billing</a></nav>' +
          '<div class="nl-commandbar__actions">' + trigger + theme + '<a class="fbtn" href="../../F19-notifications/V1/index.html" aria-label="Notifications, 6 unread">Alerts · 6</a></div></header>', true);
        bar.classList.add('nl-commandbar--inpage');
      }
    }
  }
  nlBoot();

  /* ---------------------------------------------------------------- theme */
  function setTheme(dark, remember) {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $$('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
    if (remember) { try { localStorage.setItem('nl-theme', dark ? 'dark' : 'light'); } catch (e) {} }
    document.dispatchEvent(new CustomEvent('nl:theme', { detail: { dark: dark } }));
  }
  /* Capture phase intentionally owns the theme action. Older hand-authored
     variants have a local theme listener too; handling it here prevents a
     double-toggle while preserving one persistent theme across the whole lab. */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    setTheme(!document.documentElement.classList.contains('dark'), true);
  }, true);
  setTheme(document.documentElement.classList.contains('dark'), false);

  /* ------------------------------------------------------------ mobile nav */
  function nav(open) {
    document.body.classList.toggle('nav-open', open);
    var s = $('[data-nav-scrim]'); if (s) s.dataset.show = String(open);
    $$('[data-nav-open]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
    if (open) { var f = $('.snav a', $('.side')); if (f) setTimeout(function () { f.focus(); }, 60); }
  }
  $$('[data-nav-open]').forEach(function (b) { b.addEventListener('click', function () { nav(!document.body.classList.contains('nav-open')); }); });
  $$('[data-nav-close]').forEach(function (b) { b.addEventListener('click', function () { nav(false); }); });
  var navScrim = $('[data-nav-scrim]');
  if (navScrim && !navScrim.hasAttribute('data-nav-close')) navScrim.setAttribute('data-nav-close', '');
  $$('[data-nav-close]').forEach(function (b) { b.addEventListener('click', function () { nav(false); }); });

  /* --------------------------------------------------------------- menus */
  var openMenus = [];
  /* Menus that live inside an overflow-clipped panel (a data grid, a scroll box)
     are re-anchored to the viewport so they can never be cut off. */
  function placeMenu(m, btn) {
    var clip = m.closest('.dt,.dt__scroll,.page--scroll,[data-clip]');
    if (!clip) { m.removeAttribute('data-fixed'); m.style.left = ''; m.style.top = ''; return; }
    m.setAttribute('data-fixed', 'true');
    m.dataset.open = 'true';
    var r = btn.getBoundingClientRect();
    var mw = m.offsetWidth || 220, mh = m.offsetHeight || 200;
    var left = Math.min(Math.max(8, r.right - mw), window.innerWidth - mw - 8);
    var top = r.bottom + 6;
    if (top + mh > window.innerHeight - 8) top = Math.max(8, r.top - mh - 6);
    m.style.left = left + 'px'; m.style.top = top + 'px';
  }
  function closeMenu(m, restore) {
    m.dataset.open = 'false';
    var btn = $('[data-menu-btn="' + m.id + '"]');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (restore && btn) btn.focus();
    openMenus = openMenus.filter(function (x) { return x !== m; });
  }
  $$('[data-menu-btn]').forEach(function (btn) {
    var m = document.getElementById(btn.getAttribute('data-menu-btn'));
    if (!m) return;
    m.dataset.open = m.dataset.open || 'false';
    btn.setAttribute('aria-expanded', m.dataset.open === 'true' ? 'true' : 'false');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = m.dataset.open !== 'true';
      if (willOpen) placeMenu(m, btn);
      openMenus.slice().forEach(function (o) { if (o !== m) closeMenu(o, false); });
      m.dataset.open = String(willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) {
        openMenus.push(m);
        var first = $('.menu__i,.menu__opt', m); if (first) setTimeout(function () { first.focus(); }, 30);
      }
    });
    m.addEventListener('keydown', function (e) {
      var items = $$('.menu__i,.menu__opt,.menu__f .btn', m).filter(function (i) { return i.offsetParent !== null; });
      var i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(m, true); }
      if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (items[i - 1] || items[items.length - 1]).focus(); }
      if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
    });
    $$('.menu__opt', m).forEach(function (o) {
      o.addEventListener('click', function () {
        if (o.hasAttribute('aria-checked')) o.setAttribute('aria-checked', o.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
        m.dispatchEvent(new CustomEvent('nl:menuopt', { detail: { opt: o }, bubbles: true }));
      });
    });
    $$('.menu__i', m).forEach(function (o) {
      o.addEventListener('click', function () { if (!o.hasAttribute('data-keep')) closeMenu(m, false); });
    });
  });
  document.addEventListener('click', function (e) {
    openMenus.slice().forEach(function (m) {
      if (!m.contains(e.target) && !m.parentElement.contains(e.target)) closeMenu(m, false);
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openMenus.slice().forEach(function (m) { closeMenu(m, true); }); });

  /* ---------------------------------------------------- sheets / dialogs */
  var lastFocus = null;
  function trap(container, e) {
    var f = $$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', container)
      .filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  function openOverlay(el) {
    if (!el) return;
    lastFocus = document.activeElement;
    el.dataset.open = 'true';
    document.documentElement.classList.add('lock');
    var scrim = $('[data-sheet-scrim]'); if (scrim) scrim.dataset.show = 'true';
    el.setAttribute('aria-hidden', 'false');
    setTimeout(function () {
      var f = $('[autofocus],input,button', el); if (f) f.focus();
    }, 40);
    el.__trap = function (e) { trap(el, e); };
    document.addEventListener('keydown', el.__trap);
  }
  function closeOverlay(el, restore) {
    if (!el) return;
    el.dataset.open = 'false';
    el.setAttribute('aria-hidden', 'true');
    var anyOpen = $$('.sheet[data-open="true"],.palette[data-open="true"],.dialog[data-open="true"]').length;
    if (!anyOpen) {
      document.documentElement.classList.remove('lock');
      var scrim = $('[data-sheet-scrim]'); if (scrim) scrim.dataset.show = 'false';
    }
    if (el.__trap) document.removeEventListener('keydown', el.__trap);
    if (restore !== false && lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $$('.palette[data-open="true"]').forEach(function (p) { closeOverlay(p); });
      $$('.sheet[data-open="true"],.dialog[data-open="true"]').forEach(function (p) { closeOverlay(p); });
      if (document.body.classList.contains('nav-open')) nav(false);
    }
  });
  /* Delegated so hand-authored collections can add an inspect action after the
     initial DOM scan without losing focus trapping or focus restoration. */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-open-sheet],[data-open-dialog]');
    if (!b) return;
    var id = b.getAttribute('data-open-sheet') || b.getAttribute('data-open-dialog');
    openOverlay(document.getElementById(id));
  });
  $$('.sheet,.dialog,.palette').forEach(function (o) {
    o.setAttribute('aria-hidden', String(o.dataset.open !== 'true'));
    o.addEventListener('click', function (e) { if (e.target === o) closeOverlay(o); });
    $$('[data-close]', o).forEach(function (c) { c.addEventListener('click', function () { closeOverlay(o); }); });
  });
  var sheetScrim = $('[data-sheet-scrim]');
  if (sheetScrim) sheetScrim.addEventListener('click', function () {
    $$('.sheet[data-open="true"],.palette[data-open="true"],.dialog[data-open="true"]').forEach(function (o) { closeOverlay(o); });
  });

  /* ----------------------------------------------------------------- tabs */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = tabs.length;
        if (k === 'ArrowRight') { e.preventDefault(); select((i + 1) % n, true); }
        if (k === 'ArrowLeft') { e.preventDefault(); select((i - 1 + n) % n, true); }
        if (k === 'Home') { e.preventDefault(); select(0, true); }
        if (k === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
    var init = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(init < 0 ? 0 : init, false);
    root.__select = select;
    /* deep link: #tabId opens that tab */
    function fromHash() {
      var h = location.hash.slice(1);
      if (!h) return;
      var idx = tabs.findIndex(function (t) { return t.getAttribute('aria-controls') === h || t.id === h; });
      if (idx >= 0) select(idx, false);
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  });
  $$('[data-tabs-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var root = document.getElementById(a.getAttribute('data-tabs-link'));
      var target = a.getAttribute('data-tab');
      if (!root || !target || !root.__select) return;
      var tabs = $$('[role="tab"]', root);
      var i = tabs.findIndex(function (t) { return t.getAttribute('aria-controls') === target; });
      if (i >= 0) { e.preventDefault(); root.__select(i, false); root.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  /* ------------------------------------------------------------ segmented */
  $$('.segmented, [data-seg]').forEach(function (seg) {
    var btns = $$('button[data-v],a[data-v]', seg);
    if (!btns.length) return;
    btns.forEach(function (b) {
      b.addEventListener('click', function (e) {
        if (b.tagName === 'A') e.preventDefault();
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        seg.dispatchEvent(new CustomEvent('nl:seg', { detail: { value: b.getAttribute('data-v'), btn: b }, bubbles: true }));
      });
    });
  });

  /* ------------------------------------------------------------------ grid */
  function cmp(a, b, type) {
    if (type === 'num') return (parseFloat(a) || 0) - (parseFloat(b) || 0);
    if (type === 'date') return (Date.parse(a) || 0) - (Date.parse(b) || 0);
    return String(a).localeCompare(String(b), 'en', { numeric: true });
  }
  function initGrid(root) {
    var table = $('table', root);
    if (!table || !table.tBodies[0]) return;
    var tbody = table.tBodies[0];
    var rows = $$('tr', tbody).filter(function (r) { return !r.hasAttribute('data-static'); });
    var qIn = $('[data-dt-q]', root) || $('[data-dt-q]', document);
    var pager = $('[data-dt-pager]', root);
    var countEl = $('[data-dt-count]', root);
    var emptyEl = $('[data-dt-empty]', root);
    var live = $('[data-dt-live]', root);
    var sizeSel = $('[data-dt-size]', root);
    var bulk = $('[data-dt-bulk]', root);
    var checkAll = $('[data-dt-checkall]', root);
    var st = { q: '', page: 1, size: sizeSel ? parseInt(sizeSel.value, 10) || 10 : 10, sort: null, dir: 1, filters: {} };

    rows.forEach(function (r) {
      r.dataset.search = (r.dataset.search || r.textContent || '').toLowerCase().replace(/\s+/g, ' ').trim();
    });

    function filterEls() { return $$('[data-dt-f]', root); }
    filterEls().forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-dt-f'), v = b.getAttribute('data-fv');
        if (b.tagName === 'BUTTON') {
          var group = filterEls().filter(function (x) { return x.getAttribute('data-dt-f') === k; });
          if (b.getAttribute('aria-pressed') === 'true' && v !== 'all') {
            b.setAttribute('aria-pressed', 'false');
          } else if (v === 'all') {
            group.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          } else {
            group.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            st.filters[k] = v;
            st.page = 1; paint(); return;
          }
          delete st.filters[k]; st.page = 1; paint();
        }
      });
    });
    $$('[data-dt-sel]', root).forEach(function (sel) {
      sel.addEventListener('change', function () {
        var k = sel.getAttribute('data-dt-sel');
        if (sel.value) st.filters[k] = sel.value; else delete st.filters[k];
        st.page = 1; paint();
      });
    });
    if (qIn) {
      qIn.addEventListener('input', function () { st.q = qIn.value.trim().toLowerCase(); st.page = 1; paint(); });
      qIn.addEventListener('keydown', function (e) { if (e.key === 'Escape') { qIn.value = ''; st.q = ''; paint(); } });
    }
    $$('[data-sort]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-sort');
        if (st.sort === k) st.dir = -st.dir; else { st.sort = k; st.dir = 1; }
        paint();
      });
    });
    if (sizeSel) sizeSel.addEventListener('change', function () { st.size = parseInt(sizeSel.value, 10) || 10; st.page = 1; paint(); });
    $$('[data-dt-density]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-dt-density');
        $$('[data-dt-density]', root).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        root.classList.toggle('dt--dense', v === 'dense');
        root.classList.toggle('dt--airy', v === 'airy');
      });
    });

    var sel = {};
    function syncBulk() {
      var n = Object.keys(sel).filter(function (k) { return sel[k]; }).length;
      if (bulk) {
        bulk.dataset.show = n ? 'true' : 'false';
        var t = $('[data-dt-bulk-n]', bulk); if (t) t.textContent = String(n);
      }
      if (checkAll) {
        var pageRows = rows.filter(function (r) { return r.dataset.vis === '1'; });
        var on = pageRows.filter(function (r) { return sel[r.dataset.id]; }).length;
        checkAll.checked = on > 0 && on === pageRows.length;
        checkAll.indeterminate = on > 0 && on < pageRows.length;
      }
    }
    $$('[data-dt-check]', root).forEach(function (c) {
      var row = c.closest('tr');
      row.dataset.id = row.dataset.id || 'r' + Math.random().toString(36).slice(2, 7);
      c.addEventListener('change', function () { sel[row.dataset.id] = c.checked; row.dataset.selected = String(c.checked); syncBulk(); });
    });
    if (checkAll) checkAll.addEventListener('change', function () {
      rows.forEach(function (r) {
        if (r.dataset.vis !== '1') return;
        sel[r.dataset.id] = checkAll.checked; r.dataset.selected = String(checkAll.checked);
        var c = $('[data-dt-check]', r); if (c) c.checked = checkAll.checked;
      });
      syncBulk();
    });
    $$('[data-dt-clear-sel]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        sel = {}; rows.forEach(function (r) { r.dataset.selected = 'false'; var c = $('[data-dt-check]', r); if (c) c.checked = false; });
        syncBulk();
      });
    });

    function paint() {
      var list = rows.filter(function (r) {
        if (st.q && r.dataset.search.indexOf(st.q) === -1) return false;
        for (var k in st.filters) {
          if ((r.getAttribute('data-f-' + k) || '') !== st.filters[k]) return false;
        }
        return true;
      });
      if (st.sort) {
        var type = ($('[data-sort="' + st.sort + '"]', root) || {}).dataset;
        type = type && type.type ? type.type : 'text';
        list.sort(function (a, b) {
          var av = (a.querySelector('[data-col="' + st.sort + '"]') || {}).textContent || '';
          var bv = (b.querySelector('[data-col="' + st.sort + '"]') || {}).textContent || '';
          if (type === 'num') { av = (a.getAttribute('data-s-' + st.sort) || av); bv = (b.getAttribute('data-s-' + st.sort) || bv); }
          return cmp(av, bv, type) * st.dir;
        });
      }
      var total = list.length, pages = Math.max(1, Math.ceil(total / st.size));
      if (st.page > pages) st.page = pages;
      var start = (st.page - 1) * st.size, end = Math.min(start + st.size, total);
      rows.forEach(function (r) { r.dataset.vis = '0'; r.hidden = true; });
      list.slice(start, end).forEach(function (r) { tbody.appendChild(r); r.hidden = false; r.dataset.vis = '1'; });
      if (emptyEl) emptyEl.hidden = total !== 0;
      var sc = $('[data-dt-scroll]', root); if (sc) sc.hidden = total === 0;
      if (countEl) {
        countEl.innerHTML = total === 0 ? 'No matching records'
          : '<b>' + (start + 1) + '–' + end + '</b> of <b>' + total + '</b>';
      }
      if (live) live.textContent = total + ' records shown, ' + total + ' match the current filters.';
      if (pager) {
        pager.innerHTML = '';
        var mk = function (label, page, opts) {
          opts = opts || {};
          var b = document.createElement('button');
          b.type = 'button'; b.textContent = label;
          if (opts.aria) b.setAttribute('aria-label', opts.aria);
          if (opts.disabled) b.disabled = true;
          if (opts.current) b.setAttribute('aria-current', 'page');
          if (opts.cls) b.className = opts.cls;
          b.addEventListener('click', function () { st.page = page; paint(); });
          pager.appendChild(b);
        };
        mk('‹', Math.max(1, st.page - 1), { aria: 'Previous page', disabled: st.page === 1 });
        var nums = [];
        for (var p = 1; p <= pages; p++) {
          if (p === 1 || p === pages || Math.abs(p - st.page) <= 1) nums.push(p);
          else if (nums[nums.length - 1] !== '…') nums.push('…');
        }
        nums.forEach(function (n) {
          if (n === '…') { var s = document.createElement('span'); s.className = 'gap'; s.textContent = '…'; pager.appendChild(s); }
          else mk(String(n), n, { current: n === st.page, aria: 'Page ' + n });
        });
        mk('›', Math.min(pages, st.page + 1), { aria: 'Next page', disabled: st.page === pages });
      }
      syncBulk();
      /* active filter chips + toolbar count */
      var chipsWrap = $('[data-active-list]', root);
      var activeBar = $('[data-activef]', root);
      var nActive = Object.keys(st.filters).length;
      var fc = $('[data-fcount]', root);
      if (fc) { fc.textContent = String(nActive); fc.hidden = !nActive; }
      if (chipsWrap && activeBar) {
        chipsWrap.innerHTML = '';
        Object.keys(st.filters).forEach(function (k) {
          var b = filterEls().filter(function (x) { return x.getAttribute('data-dt-f') === k && x.getAttribute('data-fv') === st.filters[k]; })[0];
          var label = b ? (b.textContent || '').replace(/\s+/g, ' ').trim() : st.filters[k];
          var chip = document.createElement('span');
          chip.className = 'chip';
          chip.innerHTML = '<span></span><button type="button" aria-label="Remove filter"><svg class="i" aria-hidden="true" style="width:11px;height:11px"><use href="#i-x"/></svg></button>';
          chip.firstChild.textContent = label;
          $('button', chip).addEventListener('click', function () { delete st.filters[k]; st.page = 1; paint(); });
          chipsWrap.appendChild(chip);
        });
        activeBar.hidden = nActive === 0;
      }
      $$('[data-dt-sort]', root).forEach(function (b) { b.removeAttribute('aria-sort'); });
      if (st.sort) {
        var th = $('[data-sort="' + st.sort + '"]', root);
        if (th) th.setAttribute('aria-sort', st.dir === 1 ? 'ascending' : 'descending');
      }
      root.dispatchEvent(new CustomEvent('nl:grid', { detail: { total: total, page: st.page, size: st.size } }));
    }
    root.__grid = { state: st, paint: paint };
    paint();
    $$('[data-dt-clear]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        st.q = ''; st.filters = {}; st.page = 1; st.sort = null; st.dir = 1;
        if (qIn) qIn.value = '';
        filterEls().forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        $$('[data-dt-sel]', root).forEach(function (s) { s.value = ''; });
        paint();
      });
    });
  }
  $$('[data-dt]').forEach(initGrid);

  /* ------------------------------------------------- generic list search */
  $$('[data-list-search]').forEach(function (inp) {
    var scope = document.querySelector(inp.getAttribute('data-list-search'));
    if (!scope) return;
    var items = $$('[data-item]', scope);
    var count = $('[data-list-count]');
    var none = $('[data-list-empty]', scope.parentElement || document);
    inp.addEventListener('input', function () {
      var q = inp.value.trim().toLowerCase();
      var n = 0;
      items.forEach(function (it) {
        var hit = !q || (it.dataset.search || it.textContent).toLowerCase().indexOf(q) > -1;
        it.hidden = !hit; if (hit) n++;
      });
      if (count) count.textContent = String(n);
      if (none) none.hidden = n !== 0;
    });
  });

  /* ---------------------------------------------------- saved views (local) */
  $$('[data-views]').forEach(function (wrap) {
    var key = wrap.getAttribute('data-views-key') || 'nl-view';
    var list = $('[data-views-list]', wrap);
    var addBtn = $('[data-views-add]', wrap);
    var grid = document.querySelector(wrap.getAttribute('data-views-target') || '[data-dt]');
    if (!list) return;
    var load = function () { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; } };
    var save = function (v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} };
    var render = function () {
      var vs = load();
      list.innerHTML = '';
      if (!vs.length) { var s = document.createElement('span'); s.className = 'muted f12'; s.textContent = 'No saved views yet'; list.appendChild(s); return; }
      vs.forEach(function (v, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'chip';
        b.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-bookmark"/></svg>' + v.name;
        b.addEventListener('click', function () {
          if (!grid || !grid.__grid) return;
          var st = grid.__grid.state;
          st.q = v.q || ''; st.filters = v.filters || {}; st.page = 1;
          var q = $('[data-dt-q]', grid); if (q) q.value = v.q || '';
          $$('[data-dt-f]', grid).forEach(function (x) {
            x.setAttribute('aria-pressed', String(st.filters[x.getAttribute('data-dt-f')] === x.getAttribute('data-fv')));
          });
          grid.__grid.paint();
          nlToast('View “' + v.name + '” applied');
        });
        list.appendChild(b);
      });
    };
    if (addBtn) addBtn.addEventListener('click', function () {
      if (!grid || !grid.__grid) return;
      var name = window.prompt('Name this view', 'My view');
      if (!name) return;
      var vs = load(); vs.push({ name: name, q: grid.__grid.state.q, filters: grid.__grid.state.filters });
      save(vs); render(); nlToast('View saved on this device');
    });
    render();
  });

  /* -------------------------------------------------------------- toasts */
  var tWrap = $('.toasts');
  if (!tWrap) { tWrap = document.createElement('div'); tWrap.className = 'toasts'; tWrap.setAttribute('role', 'status'); tWrap.setAttribute('aria-live', 'polite'); document.body.appendChild(tWrap); }
  function nlToast(msg, opts) {
    opts = opts || {};
    var t = document.createElement('div');
    t.className = 'toast' + (opts.type ? ' toast--' + opts.type : '');
    t.innerHTML = '<svg class="i" aria-hidden="true"><use href="#' + (opts.type === 'warn' ? 'i-alert' : opts.type === 'err' ? 'i-x' : 'i-check') + '"/></svg><span></span>';
    $('span', t).textContent = msg;
    tWrap.appendChild(t);
    requestAnimationFrame(function () { t.dataset.in = 'true'; });
    setTimeout(function () { t.dataset.out = 'true'; setTimeout(function () { t.remove(); }, 220); }, opts.ms || 2600);
  }
  window.nlToast = nlToast;
  $$('[data-toast]').forEach(function (b) {
    b.addEventListener('click', function () { nlToast(b.getAttribute('data-toast'), { type: b.getAttribute('data-toast-type') || '' }); });
  });

  /* ------------------------------------------------ local payment proof picker
     F16 previously inserted a hard-coded sample filename on click. Use the
     user's real local files instead; no bytes are uploaded by this static lab. */
  if (nlFamily() && nlFamily().id === 'F16') {
    $$('[data-drop]').forEach(function (drop) {
      var host = $('[data-files]', drop.parentElement) || $('[data-files]');
      if (!host) return;
      drop.classList.add('dropzone');
      drop.setAttribute('aria-describedby', 'nl-proof-note');
      var picker = document.createElement('input');
      picker.type = 'file'; picker.accept = '.png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf';
      picker.multiple = true; picker.hidden = true; picker.tabIndex = -1;
      drop.appendChild(picker);
      var note = document.createElement('span'); note.className = 'nl-proof-note'; note.id = 'nl-proof-note';
      note.textContent = 'Local selection only · upload simulated; no file leaves this device.';
      drop.insertAdjacentElement('afterend', note);
      function openPicker(e) {
        if (e.target === picker) return;
        e.preventDefault(); e.stopImmediatePropagation(); picker.click();
      }
      drop.addEventListener('click', openPicker, true);
      picker.addEventListener('click', function (e) { e.stopPropagation(); });
      drop.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') openPicker(e);
      }, true);
      ['dragenter', 'dragover'].forEach(function (type) { drop.addEventListener(type, function (e) {
        e.preventDefault(); e.stopImmediatePropagation(); drop.dataset.dragover = 'true';
      }, true); });
      ['dragleave', 'drop'].forEach(function (type) { drop.addEventListener(type, function (e) {
        e.preventDefault(); e.stopImmediatePropagation(); drop.dataset.dragover = 'false';
        if (type === 'drop' && e.dataTransfer) addFiles(e.dataTransfer.files);
      }, true); });
      function addFiles(list) {
        var accepted = 0;
        Array.prototype.slice.call(list || []).forEach(function (file) {
          var ext = (file.name.split('.').pop() || '').toLowerCase();
          if (['png', 'jpg', 'jpeg', 'pdf'].indexOf(ext) === -1) { nlToast(file.name + ': choose PNG, JPG or PDF', { type: 'warn' }); return; }
          if (file.size > 10 * 1024 * 1024) { nlToast(file.name + ': proof files must be 10 MB or smaller', { type: 'warn' }); return; }
          var pill = document.createElement('div'); pill.className = 'filepill nl-proof-file';
          var label = document.createElement('span'); label.textContent = file.name + ' · ' + (file.size ? Math.max(1, Math.round(file.size / 1024)) + ' KB' : 'local file');
          var remove = document.createElement('button'); remove.type = 'button'; remove.className = 'x'; remove.textContent = 'Remove';
          remove.setAttribute('aria-label', 'Remove ' + file.name);
          remove.addEventListener('click', function () { pill.remove(); drop.dataset.hasProof = host.children.length ? 'true' : 'false'; });
          pill.appendChild(label); pill.appendChild(remove); host.appendChild(pill); accepted++;
        });
        drop.dataset.hasProof = host.children.length ? 'true' : 'false';
        if (accepted) nlToast(accepted + ' proof file' + (accepted === 1 ? '' : 's') + ' selected locally — nothing uploaded');
      }
      picker.addEventListener('change', function () { addFiles(picker.files); picker.value = ''; });
    });
  }

  /* ------------------------------------------------------- local form drafts
     Opt in on a form or main region. Values never leave localStorage; restore
     is explicit and required-field readiness is deterministic, not a score. */
  $$('[data-nl-draft]').forEach(function (region) {
    var key = 'nl-draft:' + location.pathname;
    var draft = { values: {}, savedAt: '' }, restoreMode = false, saveTimer = null;
    try { draft = Object.assign(draft, JSON.parse(localStorage.getItem(key) || '{}')); } catch (e) {}
    if (!draft.values) draft.values = {};
    var panel = nlAdd(region, '<section class="nl-draft" aria-label="Browser-local draft"><div class="nl-draft__top"><div><b>Local draft</b><span data-nl-draft-status>Not saved yet</span></div><div class="nl-draft__actions"><button class="fbtn" type="button" data-nl-draft-save>Save now</button><button class="fbtn" type="button" data-nl-draft-restore>Restore</button><button class="fbtn" type="button" data-nl-draft-clear>Clear saved copy</button></div></div><div class="nl-draft__readiness"><div class="nl-draft__meter" role="progressbar" aria-label="Required fields complete" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i data-nl-draft-bar></i></div><span data-nl-draft-ready></span></div><small>Stored only in this browser · never submitted automatically · files are not persisted</small></section>', true);
    var status = $('[data-nl-draft-status]', panel), restoreBtn = $('[data-nl-draft-restore]', panel);
    function fields() { return $$('input:not([type="file"]):not([type="submit"]):not([type="button"]),textarea,select', region); }
    function fieldKey(el) { return el.getAttribute('data-q') || el.id || el.name || ''; }
    function valueOf(el) { return el.type === 'checkbox' ? el.checked : (el.type === 'radio' ? (el.checked ? el.value : undefined) : el.value); }
    function storeField(el) {
      var k = fieldKey(el); if (!k) return;
      var v = valueOf(el); if (v === undefined) return;
      draft.values[k] = v;
    }
    function collect() {
      fields().forEach(storeField);
      var cat = $('.cat[aria-pressed="true"],[data-cat][aria-pressed="true"]', region);
      if (cat) draft.values.category = cat.getAttribute('data-cat') || nlText(cat);
    }
    function readiness() {
      var required = fields().filter(function (el) { return el.required && fieldKey(el); }).map(fieldKey);
      var custom = region.getAttribute('data-nl-draft-required');
      if (custom) required = custom.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
      required = required.filter(function (x, i) { return required.indexOf(x) === i; });
      var complete = required.filter(function (k) {
        var el = fields().filter(function (f) { return fieldKey(f) === k; })[0], v = el ? valueOf(el) : draft.values[k];
        return !(v === undefined || v === null || v === '' || v === false);
      }).length;
      var pct = required.length ? Math.round(complete / required.length * 100) : 100;
      $('[data-nl-draft-bar]', panel).style.width = pct + '%';
      $('.nl-draft__meter', panel).setAttribute('aria-valuenow', String(pct));
      $('[data-nl-draft-ready]', panel).textContent = complete + ' of ' + required.length + ' required fields ready';
    }
    function saveNow() {
      collect(); draft.savedAt = new Date().toISOString();
      try {
        localStorage.setItem(key, JSON.stringify(draft));
        status.textContent = 'Saved on this device · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        restoreBtn.hidden = false;
      } catch (e) { status.textContent = 'Browser storage unavailable — keep this tab open'; }
      readiness();
    }
    function scheduleSave() {
      status.textContent = 'Editing locally…'; clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 320); readiness();
    }
    function restoreFields(all) {
      fields().forEach(function (el) {
        var k = fieldKey(el); if (!k || draft.values[k] === undefined) return;
        if (!all && !restoreMode) return;
        if (!all && el.dataset.nlDraftRestored) return;
        if (el.type === 'checkbox') el.checked = !!draft.values[k];
        else if (el.type === 'radio') el.checked = el.value === draft.values[k];
        else el.value = draft.values[k];
        el.dataset.nlDraftRestored = 'true';
        el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
      });
      if (draft.values.category) {
        $$('.cat,[data-cat]', region).forEach(function (b) {
          var name = b.getAttribute('data-cat') || nlText(b), on = name === draft.values.category;
          b.setAttribute('aria-pressed', String(on));
        });
      }
      readiness();
    }
    region.addEventListener('input', function (e) { if (fieldKey(e.target)) { storeField(e.target); scheduleSave(); } });
    region.addEventListener('change', function (e) { if (fieldKey(e.target)) { storeField(e.target); scheduleSave(); } });
    region.addEventListener('click', function (e) {
      var choice = e.target.closest && e.target.closest('[data-q][data-value]');
      if (choice) { draft.values[choice.getAttribute('data-q')] = choice.getAttribute('data-value'); scheduleSave(); }
      else if (e.target.closest && e.target.closest('.cat,[data-cat],[data-req],[data-b]')) setTimeout(scheduleSave, 0);
    });
    $('[data-nl-draft-save]', panel).addEventListener('click', function () { saveNow(); nlToast('Draft saved on this device only'); });
    restoreBtn.addEventListener('click', function () { restoreMode = true; restoreFields(true); status.textContent = 'Restored the browser-local draft'; nlToast('Local draft restored — review before submitting'); });
    $('[data-nl-draft-clear]', panel).addEventListener('click', function () {
      try { localStorage.removeItem(key); } catch (e) {}
      draft = { values: {}, savedAt: '' }; restoreMode = false; restoreBtn.hidden = true; status.textContent = 'Saved copy cleared · current fields unchanged'; readiness();
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-draft]'); if (!b) return;
      e.preventDefault(); e.stopImmediatePropagation(); saveNow(); nlToast('Draft saved on this device — not synced to an account');
    }, true);
    if (window.MutationObserver) {
      var draftObserver = new MutationObserver(function (records) {
        if (restoreMode && records.some(function (r) { return !panel.contains(r.target); })) restoreFields(false);
      });
      draftObserver.observe(region, { childList: true, subtree: true });
    }
    restoreBtn.hidden = !draft.savedAt;
    if (draft.savedAt) status.textContent = 'Browser-local draft available';
    readiness();
  });

  /* ------------------------------------------------------ local file shelves */
  $$('input[data-nl-local-files]').forEach(function (input) {
    var host = $(input.getAttribute('data-nl-local-files')), selected = [];
    if (!host) return;
    var drop = input.id ? $('label[data-nl-file-drop][for="' + input.id + '"]') : null;
    function syncInput() {
      try { var dt = new DataTransfer(); selected.forEach(function (f) { dt.items.add(f); }); input.files = dt.files; } catch (e) {}
    }
    function render() {
      host.innerHTML = '';
      selected.forEach(function (file, index) {
        var row = nlAdd(host, '<div class="att nl-local-file"><span class="nl-local-file__label"><b></b><small></small></span><button class="nl-local-file__remove" type="button">Remove</button></div>');
        $('b', row).textContent = file.name;
        $('small', row).textContent = 'Selected locally · ' + (file.size ? Math.max(1, Math.round(file.size / 1024)) + ' KB' : 'local file');
        $('button', row).setAttribute('aria-label', 'Remove ' + file.name);
        $('button', row).addEventListener('click', function () { selected.splice(index, 1); syncInput(); render(); nlToast(file.name + ' removed from the local selection'); });
      });
      host.hidden = !selected.length;
    }
    function accept(fileList) {
      var files = Array.prototype.slice.call(fileList || []);
      if (files.length > 5) { nlToast('Choose up to five files'); files = []; }
      else if (files.some(function (f) { return f.size > 10 * 1024 * 1024; })) { nlToast('Each attachment must be 10 MB or smaller'); files = []; }
      selected = files; if (!files.length) input.value = ''; else syncInput(); render();
    }
    input.addEventListener('change', function () { accept(input.files); });
    if (drop) {
      drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
      ['dragenter', 'dragover'].forEach(function (type) { drop.addEventListener(type, function (e) { e.preventDefault(); drop.classList.add('is-file-drag'); }); });
      drop.addEventListener('dragleave', function () { drop.classList.remove('is-file-drag'); });
      drop.addEventListener('drop', function (e) { e.preventDefault(); drop.classList.remove('is-file-drag'); accept(e.dataTransfer && e.dataTransfer.files); });
    }
  });

  /* ------------------------------------------------------------ copy chip */
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var txt = b.getAttribute('data-copy');
      var done = function () { nlToast('Copied to clipboard'); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
    });
  });

  /* ------------------------------------------------------------- palette */
  $$('.palette').forEach(function (pal) {
    var input = $('input', pal);
    var items = $$('.palette__i', pal);
    var groups = $$('.palette__g', pal);
    var none = $('.palette__none', pal);
    var i = 0;
    function visible() { return items.filter(function (x) { return !x.hidden; }); }
    function paint() {
      var q = (input.value || '').trim().toLowerCase();
      items.forEach(function (x) { x.hidden = q && x.textContent.toLowerCase().indexOf(q) === -1; x.dataset.on = 'false'; });
      groups.forEach(function (g) { g.hidden = !g.nextElementSibling || $$('.palette__i', g.parentElement).every(function (x) { return x.hidden; }); });
      if (none) none.hidden = visible().length !== 0;
      var v = visible(); i = 0; if (v[0]) v[0].dataset.on = 'true';
    }
    if (input) {
      input.addEventListener('input', paint);
      input.addEventListener('keydown', function (e) {
        var v = visible();
        if (!v.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); v[i].dataset.on = 'false'; i = (i + 1) % v.length; v[i].dataset.on = 'true'; v[i].scrollIntoView({ block: 'nearest' }); }
        if (e.key === 'ArrowUp') { e.preventDefault(); v[i].dataset.on = 'false'; i = (i - 1 + v.length) % v.length; v[i].dataset.on = 'true'; v[i].scrollIntoView({ block: 'nearest' }); }
        if (e.key === 'Enter') { e.preventDefault(); v[i].click(); }
      });
    }
    items.forEach(function (x) { x.addEventListener('click', function () { closeOverlay(pal, true); }); });
    pal.__open = function () { paint(); openOverlay(pal); };
  });
  $$('[data-palette-open]').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = document.getElementById(b.getAttribute('data-palette-open')) || $('.palette');
      if (p && p.__open) p.__open(); else openOverlay(p);
    });
  });
  document.addEventListener('keydown', function (e) {
    var p = $('.palette');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (p) (p.__open ? p.__open() : openOverlay(p)); }
    if (e.key === '/' && !/^(input|textarea|select)$/i.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
      var q = $('[data-dt-q]'); if (q) { e.preventDefault(); q.focus(); }
    }
  });

  /* --------------------------------------------------------- count-ups */
  function inr(n, dec) {
    if (dec === undefined) dec = 0;
    try { return new Intl.NumberFormat('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n); }
    catch (e) { return String(n); }
  }
  window.nlINR = inr;
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    if (RM) { el.textContent = pre + inr(target, dec) + suf; return; }
    var t0 = null, dur = 720;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + inr(target * e, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* --------------------------------------------------- reveal + data-viz */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        if (el.hasAttribute('data-count')) countUp(el);
        if (el.hasAttribute('data-reveal')) { el.classList.add('is-in'); }
        if (el.hasAttribute('data-bar')) {
          var f = $('.meter__f', el) || $('.hbar__fill', el) || el;
          var v = el.getAttribute('data-bar');
          requestAnimationFrame(function () { f.style.width = v + '%'; });
        }
        if (el.classList.contains('ring')) {
          var c = $('circle.val', el);
          var pct = parseFloat(el.getAttribute('data-v') || '0');
          if (c) {
            var r = parseFloat(c.getAttribute('r'));
            var len = 2 * Math.PI * r;
            c.style.strokeDasharray = len;
            c.style.strokeDashoffset = len;
            requestAnimationFrame(function () { c.style.strokeDashoffset = len * (1 - pct / 100); });
          }
        }
        if (el.hasAttribute('data-spark')) drawSpark(el);
        if (el.hasAttribute('data-bars')) animateBars(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    /* Only the first screen animates. Anything already below the fold is painted in its
       final state straight away — otherwise a tall page (or a full-page screenshot, or a
       reader who jumps to an anchor) shows empty bars and zeroed counters forever. */
    function paint(el) {
      if (el.hasAttribute('data-count')) {
        var t = parseFloat(el.getAttribute('data-count'));
        if (!isNaN(t)) el.textContent = (el.getAttribute('data-prefix') || '') +
          inr(t, parseInt(el.getAttribute('data-decimals') || '0', 10)) + (el.getAttribute('data-suffix') || '');
      }
      if (el.hasAttribute('data-reveal')) el.classList.add('is-in');
      if (el.hasAttribute('data-bar')) {
        var f = $('.meter__f', el) || $('.hbar__fill', el) || el;
        f.style.width = el.getAttribute('data-bar') + '%';
      }
      if (el.classList.contains('ring')) {
        var c = $('circle.val', el);
        if (c) {
          var r = parseFloat(c.getAttribute('r'));
          var len = 2 * Math.PI * r;
          c.style.strokeDasharray = len;
          c.style.strokeDashoffset = len * (1 - parseFloat(el.getAttribute('data-v') || '0') / 100);
        }
      }
      if (el.hasAttribute('data-spark')) drawSpark(el);
      if (el.hasAttribute('data-bars')) $$('[data-h]', el).forEach(function (b) { b.style.height = b.getAttribute('data-h') + '%'; });
    }
    $$('[data-count],[data-reveal],[data-bar],.ring[data-v],[data-spark],[data-bars]').forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.96 && box.bottom > 0) io.observe(el);
      else paint(el);
    });
    /* a late resize (or the reader jumping down the page) should not strand anything */
    window.addEventListener('resize', function () {
      $$('[data-count],[data-bar],.ring[data-v]').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight && el.getAttribute('data-painted') !== '1') {
          el.setAttribute('data-painted', '1'); paint(el);
        }
      });
    });
  } else {
    $$('[data-count]').forEach(countUp);
    $$('[data-bar]').forEach(function (el) { var f = $('.meter__f', el) || $('.hbar__fill', el) || el; f.style.width = el.getAttribute('data-bar') + '%'; });
    $$('[data-spark]').forEach(drawSpark);
  }
  function drawSpark(el) {
    var raw = (el.getAttribute('data-spark') || '').split(',').map(parseFloat).filter(function (n) { return !isNaN(n); });
    if (raw.length < 2) return;
    var w = 100, h = 34, min = Math.min.apply(null, raw), max = Math.max.apply(null, raw);
    var span = max - min || 1;
    var pts = raw.map(function (v, i) {
      return [(i / (raw.length - 1)) * w, h - 2 - ((v - min) / span) * (h - 6)];
    });
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(2) + ' ' + p[1].toFixed(2); }).join(' ');
    var area = d + ' L100 ' + h + ' L0 ' + h + ' Z';
    var last = pts[pts.length - 1];
    el.innerHTML = '<svg class="spark" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="ar" d="' + area + '"/><path class="ln" d="' + d + '" vector-effect="non-scaling-stroke"/>' +
      '<circle cx="' + last[0] + '" cy="' + last[1] + '" r="2.4" vector-effect="non-scaling-stroke"/></svg>';
  }
  function animateBars(el) {
    $$('[data-h]', el).forEach(function (b, i) {
      var v = b.getAttribute('data-h');
      b.style.height = '0%';
      setTimeout(function () { b.style.height = v + '%'; }, 60 + i * 45);
    });
  }

  /* --------------------------------------------------------- accordions */
  $$('[data-acc]').forEach(function (root) {
    $$('[data-acc-btn]', root).forEach(function (b) {
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      b.setAttribute('aria-expanded', panel && !panel.hidden ? 'true' : 'false');
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        if (panel) panel.hidden = open;
      });
    });
  });

  /* ------------------------------------------------------- scroll spying */
  $$('[data-spy]').forEach(function (navEl) {
    var links = $$('a[href^="#"]', navEl);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    if (!secs.length || !('IntersectionObserver' in window)) return;
    var so = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = links[secs.indexOf(en.target)];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    secs.forEach(function (s) { so.observe(s); });
  });

  /* ----------------------------------------------- demos: retry / states */
  $$('[data-retry]').forEach(function (b) {
    b.addEventListener('click', function () {
      var targetId = b.getAttribute('data-retry');
      var host = targetId ? document.getElementById(targetId) : b.closest('[data-retryable]');
      if (host) {
        host.classList.add('is-loading');
        b.disabled = true;
        setTimeout(function () {
          host.classList.remove('is-loading');
          b.disabled = false;
          nlToast('Still waiting on the projects service (502). Support has the details.', { type: 'warn', ms: 3800 });
          var card = host.querySelector('[data-degraded]');
          if (card) card.hidden = false;
        }, 1100);
      } else {
        nlToast('Retrying…', { ms: 1200 });
      }
    });
  });
  /* ?state=loading|error → deterministic demo states, generated on the fly */
  var state = new URLSearchParams(location.search).get('state');
  if (state === 'loading') {
    document.documentElement.classList.add('demo-loading');
    $$('[data-skel-target]').forEach(function (t) { t.hidden = false; });
    $$('[data-live-content]').forEach(function (t) { t.hidden = true; });
  }
  if (state === 'error') {
    $$('[data-live-content]').forEach(function (t) { t.hidden = true; });
    var e = $('[data-demo-error]');
    if (e) e.hidden = false;
  }

  /* ------------------------------------------------ v2.1 collection workbench
     Tables are discovered conservatively; card/feed collections opt in with
     data-nl-list="child selector". The original hand-authored nodes remain in
     place — filtering, sorting and grouping only reorder/reveal those nodes. */
  function nlEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function nlText(el) { return (el && el.textContent ? el.textContent : '').replace(/\s+/g, ' ').trim(); }
  function nlStatus(el) {
    var facetHost = el.closest('[data-nl-facet-label]');
    if (facetHost) {
      var explicit = el.getAttribute('data-nl-facet') || el.getAttribute('data-cat') || el.getAttribute('data-c');
      var facetNode = explicit ? null : $('[data-k]', el);
      if (!explicit && facetNode) explicit = facetNode.getAttribute('data-k');
      if (explicit) return explicit.toLowerCase();
    }
    var pill = $('.pill,.tag,[data-status]', el);
    if (pill && nlText(pill).length < 52) return nlText(pill).toLowerCase();
    var s = nlText(el).toLowerCase();
    var words = ['awaiting review','in review','not due yet','in progress','processing','completed','pending','paid','issued','expired','accepted','converted','submitted','draft','approved','rejected','failed','unread','read','locked'];
    for (var i = 0; i < words.length; i++) if (s.indexOf(words[i]) > -1) return words[i];
    return 'other';
  }
  function nlProject(el) {
    var s = nlText(el).toLowerCase();
    if (s.indexOf('khandesh') > -1) return 'khandesh';
    if (s.indexOf('b2b') > -1 || s.indexOf('wholesale') > -1) return 'b2b';
    return 'other';
  }
  function nlMoney(el) {
    var m = nlText(el).match(/₹\s*([\d,]+(?:\.\d+)?)/g) || [];
    var nums = m.map(function (x) { return parseFloat(x.replace(/[^\d.]/g, '')) || 0; });
    return nums.length ? Math.max.apply(null, nums) : 0;
  }
  function nlTitle(el) {
    var t = $('h1,h2,h3,h4,.ttl,.title,b,strong', el);
    return nlText(t).slice(0, 120) || nlText(el).slice(0, 90) || 'Workspace record';
  }
  function nlDownload(name, text, type) {
    try {
      var blob = new Blob([text], { type: type || 'text/csv;charset=utf-8' });
      var url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 500);
      nlToast('Download prepared locally — no network request');
    } catch (e) { nlToast('Download is not available in this browser', { type: 'warn' }); }
  }
  function nlInspect(records, compare) {
    var sheet = document.getElementById('nl-inspector'); if (!sheet || !records.length) return;
    records = records.slice(0, compare ? 3 : 1);
    $('[data-nl-inspect-title]', sheet).textContent = compare ? 'Compare ' + records.length + ' records' : records[0].title;
    $('[data-nl-inspect-sub]', sheet).textContent = compare ? 'Scope, state, project and value compared side by side.' : 'Item-specific details · filters and scroll position preserved.';
    var body = $('[data-nl-inspect-body]', sheet);
    if (compare) {
      body.innerHTML = '<div class="nl-compare">' + records.map(function (r) {
        return '<section><h3>' + nlEsc(r.title) + '</h3><p><b>Status</b><br>' + nlEsc(r.status) + '</p><p><b>Project</b><br>' + nlEsc(r.project) + '</p><p><b>Value</b><br>' + (r.money ? '₹' + inr(r.money, 2) : 'Not monetary') + '</p><p><b>Record</b><br>' + nlEsc(r.text.slice(0, 240)) + '</p></section>';
      }).join('') + '</div><p class="nl-preview-note">Comparison is a local view over records already loaded on this page. No scoring or AI endpoint is implied.</p>';
    } else {
      var r = records[0];
      var fields = r.fields.length ? r.fields : [['Status', r.status], ['Project', r.project], ['Value', r.money ? '₹' + inr(r.money, 2) : 'Not monetary'], ['Record', r.text]];
      body.innerHTML = '<div class="nl-inspect-lead"><b>' + nlEsc(r.title) + '</b><p>' + nlEsc(r.text.slice(0, 330)) + '</p></div>' +
        '<dl class="nl-kv">' + fields.map(function (f) { return '<dt>' + nlEsc(f[0]) + '</dt><dd>' + nlEsc(f[1]) + '</dd>'; }).join('') + '</dl>' +
        '<div class="note note--info"><span><b>Context preserved.</b> Close this sheet to return to the same query, facets, sorting and page. Preview data comes only from the loaded record.</span></div>';
    }
    var first = records[0].el.querySelector('a[href]:not([href="#"])');
    var link = $('[data-nl-inspect-link]', sheet);
    if (first) { link.hidden = false; link.setAttribute('href', first.getAttribute('href')); link.textContent = 'Open related workspace'; }
    else link.hidden = true;
    openOverlay(sheet);
  }
  function nlCollection(host, items, table) {
    if (!host || !items.length || host.__nlWorkbench) return;
    host.__nlWorkbench = true;
    var fam = nlFamily() || { id: 'F00', variant: 'V1' };
    var storage = 'nl-workbench:' + location.pathname;
    var original = items.slice();
    var state = { q: '', status: '', project: '', sort: 'original', group: '', view: '', page: 1, size: 10 };
    var selected = {};
    var headers = [];
    if (table) {
      var hr = table.tHead && table.tHead.rows[0];
      if (hr) headers = Array.prototype.map.call(hr.cells, function (c) { return nlText(c) || 'Field'; });
      if (hr) {
        var selTh = document.createElement('th'); selTh.className = 'nl-select-col'; selTh.innerHTML = '<input type="checkbox" data-nl-checkall aria-label="Select all records on this page">';
        hr.insertBefore(selTh, hr.firstChild);
        var actTh = document.createElement('th'); actTh.className = 'nl-action-col'; actTh.textContent = 'Inspect'; hr.appendChild(actTh);
      }
      items.forEach(function (r, i) {
        r.setAttribute('data-nl-key', fam.id + '-' + fam.variant + '-' + i);
        var s = document.createElement('td'); s.className = 'nl-select-col'; s.innerHTML = '<input type="checkbox" data-nl-check aria-label="Select ' + nlEsc(nlTitle(r)) + '">';
        r.insertBefore(s, r.firstChild);
        var a = document.createElement('td'); a.className = 'nl-action-col'; a.innerHTML = '<button class="nl-inspect" type="button" data-nl-inspect>Inspect</button>'; r.appendChild(a);
      });
      /* Static totals remain aligned with the two added columns. */
      $$('tbody tr', table).filter(function (r) { return items.indexOf(r) === -1 && !r.classList.contains('nl-group-row'); }).forEach(function (r) {
        if (!r.cells.length) return;
        r.insertBefore(document.createElement('td'), r.firstChild); r.appendChild(document.createElement('td'));
      });
    } else {
      items.forEach(function (el, i) {
        el.setAttribute('data-nl-key', fam.id + '-' + fam.variant + '-' + i);
        nlAdd(el, '<div class="nl-item-tools"><label class="nl-select"><input type="checkbox" data-nl-check> Select</label><button class="nl-inspect" type="button" data-nl-inspect>Quick inspect</button></div>');
      });
    }
    var wrap = document.createElement('div'); wrap.className = 'nl-workbench';
    host.parentNode.insertBefore(wrap, host); wrap.appendChild(host);
    var statusOptions = [];
    var facetLabel = host.getAttribute('data-nl-facet-label') || 'Status';
    var facetPlural = facetLabel === 'Status' ? 'statuses' : (facetLabel === 'Category' ? 'categories' : facetLabel.toLowerCase() + 's');
    items.forEach(function (el) { var s = nlStatus(el); if (statusOptions.indexOf(s) === -1 && s !== 'other') statusOptions.push(s); });
    statusOptions.sort();
    var bar = nlAdd(wrap, '<div class="nl-workbench__bar"><div class="search"><input type="search" data-nl-q placeholder="Search loaded records…" aria-label="Search records" autocomplete="off"><kbd class="kbd">/</kbd><button class="search__x" type="button" data-nl-clear-q aria-label="Clear search">×</button></div>' +
      '<select data-nl-status aria-label="Filter by ' + nlEsc(facetLabel.toLowerCase()) + '"><option value="">All ' + nlEsc(facetPlural) + '</option>' + statusOptions.map(function (s) { return '<option value="' + nlEsc(s) + '">' + nlEsc(s.replace(/\b\w/g, function (c) { return c.toUpperCase(); })) + '</option>'; }).join('') + '</select>' +
      '<select data-nl-project aria-label="Filter by project"><option value="">All projects</option><option value="khandesh">Khandesh Spice</option><option value="b2b">B2B Wholesale</option><option value="other">Other / account</option></select>' +
      '<select data-nl-sort aria-label="Sort records"><option value="original">Newest / original</option><option value="urgency">Urgency / action first</option><option value="money">Highest ₹</option><option value="name">Name A–Z</option></select>' +
      '<select data-nl-group aria-label="Group records"><option value="">Group: none</option><option value="status">Group by ' + nlEsc(facetLabel.toLowerCase()) + '</option><option value="project">Group by project</option></select>' +
      '<button class="fbtn" type="button" data-nl-density aria-label="Change row density">Density · Standard</button>' +
      (table ? '<div class="nl-columns"><button class="fbtn" type="button" data-nl-columns aria-expanded="false">Columns</button><div class="nl-columns__pop" data-nl-column-pop hidden><p class="menu__h">Visible columns</p></div></div>' : '') +
      '<span class="nl-workbench__count" data-nl-count aria-live="polite"></span></div>', true);
    var views = nlAdd(wrap, '<div class="nl-workbench__views"><span class="lbl">Local views</span><button class="chip" type="button" data-nl-view="action">Needs my action</button><button class="chip" type="button" data-nl-view="khandesh">Khandesh Spice only</button><button class="chip" type="button" data-nl-view="all">Reset view</button><span data-nl-custom-views class="r r--wrap"></span><button class="chip chip--ghost" type="button" data-nl-save>+ Save current</button></div>');
    wrap.insertBefore(views, bar.nextSibling);
    var active = nlAdd(wrap, '<div class="nl-workbench__active" data-nl-active hidden><b>Active filters</b><span class="chips" data-nl-active-list></span><button class="chip chip--ghost" type="button" data-nl-reset>Clear all</button></div>');
    wrap.insertBefore(active, host);
    var bulk = nlAdd(wrap, '<div class="nl-workbench__bulk" data-nl-bulk data-show="false"><b><span data-nl-selected>0</span> selected</b><span>Local selection</span><div class="end"><button class="btn btn-s btn-sm" type="button" data-nl-export>Export CSV</button><button class="btn btn-s btn-sm" type="button" data-nl-compare>Compare</button><button class="btn btn-s btn-sm" type="button" data-nl-reviewed>Mark reviewed</button><button class="btn btn-g btn-sm" type="button" data-nl-clear-sel>Clear</button></div></div>');
    wrap.insertBefore(bulk, host);
    var empty = nlAdd(wrap, '<div class="nl-workbench__empty" data-nl-empty hidden><b>No records match this view</b><p>Try a shorter query or clear a facet. Nothing has been deleted.</p><button class="btn btn-s btn-sm mt3" type="button" data-nl-reset>Clear filters</button></div>');
    var footer = nlAdd(wrap, '<div class="nl-workbench__footer"><span class="pagesize">Rows <select data-nl-size aria-label="Records per page"><option selected>10</option><option>25</option><option>50</option></select> · <span data-nl-range></span></span><div class="nl-workbench__pages" data-nl-pages></div></div>');

    function record(el) {
      var fields = [];
      if (table && headers.length) {
        for (var i = 0; i < headers.length; i++) if (el.cells[i + 1]) fields.push([headers[i], nlText(el.cells[i + 1])]);
      }
      return { el: el, title: nlTitle(el), text: nlText(el), status: nlStatus(el), project: nlProject(el), money: nlMoney(el), fields: fields };
    }
    function urgency(el) {
      var s = nlText(el).toLowerCase(), n = 0;
      if (/expired|failed|dispute|blocked|reject/.test(s)) n += 8;
      if (/awaiting|pending|needs|review|unread|action/.test(s)) n += 5;
      if (/processing|not due|locked/.test(s)) n += 2;
      return n;
    }
    function matches(el) {
      /* A legacy facet may also hide a record. Keep that decision instead of
         resurrecting it when the shared workbench repaints. */
      if (!el.isConnected || el.hidden || el.style.display === 'none') return false;
      var text = nlText(el).toLowerCase();
      if (state.q && text.indexOf(state.q) === -1) return false;
      if (state.status && nlStatus(el) !== state.status) return false;
      if (state.project && nlProject(el) !== state.project) return false;
      if (state.view === 'action' && urgency(el) < 3) return false;
      if (state.view === 'khandesh' && nlProject(el) !== 'khandesh') return false;
      return true;
    }
    function sorted(list) {
      var arr = list.slice();
      if (state.sort === 'money') arr.sort(function (a, b) { return nlMoney(b) - nlMoney(a); });
      else if (state.sort === 'name') arr.sort(function (a, b) { return nlTitle(a).localeCompare(nlTitle(b), 'en', { numeric: true }); });
      else if (state.sort === 'urgency') arr.sort(function (a, b) { return urgency(b) - urgency(a) || original.indexOf(a) - original.indexOf(b); });
      else arr.sort(function (a, b) { return original.indexOf(a) - original.indexOf(b); });
      if (state.group) arr.sort(function (a, b) {
        var av = state.group === 'status' ? nlStatus(a) : nlProject(a), bv = state.group === 'status' ? nlStatus(b) : nlProject(b);
        return av.localeCompare(bv) || arr.indexOf(a) - arr.indexOf(b);
      });
      return arr;
    }
    function syncSelected() {
      var n = Object.keys(selected).filter(function (k) { return selected[k]; }).length;
      $('[data-nl-selected]', bulk).textContent = String(n); bulk.dataset.show = n ? 'true' : 'false';
      $('[data-nl-compare]', bulk).disabled = n < 2;
      items.forEach(function (el) {
        var on = !!selected[el.getAttribute('data-nl-key')];
        var c = $('[data-nl-check]', el); if (c) c.checked = on;
        el.dataset.selected = String(on);
      });
    }
    function selectedRecords() { return items.filter(function (el) { return selected[el.getAttribute('data-nl-key')]; }).map(record); }
    function renderActive() {
      var list = $('[data-nl-active-list]', active); list.innerHTML = '';
      var labels = [];
      if (state.q) labels.push(['q', 'Search: ' + state.q]);
      if (state.status) labels.push(['status', facetLabel + ': ' + state.status]);
      if (state.project) labels.push(['project', 'Project: ' + state.project]);
      if (state.view) labels.push(['view', state.view === 'action' ? 'Needs my action' : 'Khandesh only']);
      if (state.group) labels.push(['group', 'Grouped by ' + state.group]);
      labels.forEach(function (x) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = x[1] + ' ×'; b.setAttribute('aria-label', 'Remove ' + x[1]);
        b.addEventListener('click', function () { state[x[0]] = ''; state.page = 1; syncControls(); paint(); }); list.appendChild(b);
      });
      active.hidden = !labels.length;
    }
    var observer = null;
    function paint() {
      if (observer) observer.disconnect();
      var filtered = sorted(items.filter(matches));
      var total = filtered.length, pages = Math.max(1, Math.ceil(total / state.size));
      if (state.page > pages) state.page = pages;
      var start = (state.page - 1) * state.size, visible = filtered.slice(start, start + state.size);
      $$('.nl-group-row,.nl-group-heading', wrap).forEach(function (g) { g.remove(); });
      items.forEach(function (el) { el.dataset.nlVis = '0'; });
      var lastGroup = null;
      visible.forEach(function (el) {
        el.dataset.nlVis = '1';
        if (table) {
          var anchor = $$('tbody tr', table).filter(function (r) { return items.indexOf(r) === -1 && !r.classList.contains('nl-group-row'); })[0] || null;
          if (state.group) {
            var gv = state.group === 'status' ? nlStatus(el) : nlProject(el);
            if (gv !== lastGroup) {
              var gr = document.createElement('tr'); gr.className = 'nl-group-row'; gr.setAttribute('data-static', '');
              var td = document.createElement('td'); td.colSpan = table.tHead ? table.tHead.rows[0].cells.length : el.cells.length;
              td.textContent = (state.group === 'status' ? facetLabel + ' · ' : 'Project · ') + gv + ' — ' + filtered.filter(function (x) { return (state.group === 'status' ? nlStatus(x) : nlProject(x)) === gv; }).length + ' records';
              gr.appendChild(td); el.parentNode.insertBefore(gr, anchor); lastGroup = gv;
            }
          }
          el.parentNode.insertBefore(el, anchor);
        } else {
          host.appendChild(el);
          if (state.group) {
            var lg = state.group === 'status' ? nlStatus(el) : nlProject(el);
            if (lg !== lastGroup) {
              var gh = document.createElement(/^(UL|OL)$/.test(host.tagName) ? 'li' : 'div'); gh.className = 'nl-group-heading'; gh.textContent = (state.group === 'status' ? facetLabel + ' · ' : 'Project · ') + lg;
              host.insertBefore(gh, el); lastGroup = lg;
            }
          }
        }
      });
      empty.hidden = total !== 0;
      if (total === 0) host.setAttribute('data-nl-host-empty', 'true'); else host.removeAttribute('data-nl-host-empty');
      $('[data-nl-count]', bar).textContent = total + ' / ' + items.length + ' match';
      $('[data-nl-range]', footer).textContent = total ? (start + 1) + '–' + Math.min(start + state.size, total) + ' of ' + total : '0 records';
      var pg = $('[data-nl-pages]', footer); pg.innerHTML = '';
      function pageBtn(label, p, disabled, current) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.disabled = disabled;
        if (current) b.setAttribute('aria-current', 'page'); b.addEventListener('click', function () { state.page = p; paint(); }); pg.appendChild(b);
      }
      pageBtn('‹', Math.max(1, state.page - 1), state.page === 1, false);
      for (var p = 1; p <= pages; p++) if (pages <= 6 || p === 1 || p === pages || Math.abs(p - state.page) <= 1) pageBtn(String(p), p, false, p === state.page);
      pageBtn('›', Math.min(pages, state.page + 1), state.page === pages, false);
      var ca = $('[data-nl-checkall]', wrap);
      if (ca) { var on = visible.filter(function (el) { return selected[el.getAttribute('data-nl-key')]; }).length; ca.checked = visible.length > 0 && on === visible.length; ca.indeterminate = on > 0 && on < visible.length; }
      syncSelected(); renderActive();
      host.dispatchEvent(new CustomEvent('nl:collection', { detail: { total: total, visible: visible.length } }));
      if (observer) observer.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'style'] });
    }
    function syncControls() {
      $('[data-nl-q]', bar).value = state.q; $('[data-nl-status]', bar).value = state.status; $('[data-nl-project]', bar).value = state.project;
      $('[data-nl-sort]', bar).value = state.sort; $('[data-nl-group]', bar).value = state.group;
      $$('[data-nl-view]', views).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-nl-view') === state.view || (b.getAttribute('data-nl-view') === 'all' && !state.view))); });
    }
    function reset() { state.q = ''; state.status = ''; state.project = ''; state.view = ''; state.group = ''; state.page = 1; syncControls(); paint(); }
    $('[data-nl-q]', bar).addEventListener('input', function () { state.q = this.value.trim().toLowerCase(); state.page = 1; this.parentElement.classList.toggle('has-val', !!this.value); paint(); });
    $('[data-nl-clear-q]', bar).addEventListener('click', function () { state.q = ''; state.page = 1; syncControls(); paint(); $('[data-nl-q]', bar).focus(); });
    ['status', 'project', 'sort', 'group'].forEach(function (k) { $('[data-nl-' + k + ']', bar).addEventListener('change', function () { state[k] = this.value; state.page = 1; paint(); }); });
    $('[data-nl-size]', footer).addEventListener('change', function () { state.size = parseInt(this.value, 10) || 10; state.page = 1; paint(); });
    $$('[data-nl-reset]', wrap).forEach(function (b) { b.addEventListener('click', reset); });
    $$('[data-nl-view]', views).forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-nl-view'); state.view = v === 'all' ? '' : v; state.page = 1; syncControls(); paint(); }); });
    $('[data-nl-density]', bar).addEventListener('click', function () {
      var modes = ['Standard', 'Compact', 'Comfortable'], current = this.textContent.split('·')[1].trim(), next = modes[(modes.indexOf(current) + 1) % modes.length];
      this.textContent = 'Density · ' + next;
      if (table) { table.classList.toggle('nl-dense-table', next === 'Compact'); table.classList.toggle('nl-airy-table', next === 'Comfortable'); }
      else { items.forEach(function (el) { el.classList.toggle('nl-dense-table', next === 'Compact'); el.classList.toggle('nl-airy-table', next === 'Comfortable'); }); }
    });
    items.forEach(function (el) {
      $('[data-nl-inspect]', el).addEventListener('click', function () { nlInspect([record(el)], false); });
      $('[data-nl-check]', el).addEventListener('change', function () { selected[el.getAttribute('data-nl-key')] = this.checked; syncSelected(); });
    });
    var ca = $('[data-nl-checkall]', wrap);
    if (ca) ca.addEventListener('change', function () { items.forEach(function (el) { if (el.dataset.nlVis === '1') selected[el.getAttribute('data-nl-key')] = ca.checked; }); syncSelected(); });
    $('[data-nl-clear-sel]', bulk).addEventListener('click', function () { selected = {}; syncSelected(); });
    $('[data-nl-compare]', bulk).addEventListener('click', function () { var r = selectedRecords(); if (r.length >= 2) nlInspect(r, true); });
    $('[data-nl-reviewed]', bulk).addEventListener('click', function () {
      selectedRecords().forEach(function (r) { r.el.classList.add('nl-reviewed'); });
      nlToast('Marked reviewed on this device'); selected = {}; syncSelected();
    });
    $('[data-nl-export]', bulk).addEventListener('click', function () {
      var recs = selectedRecords(), lines = [['Title', 'Status', 'Project', 'Value INR', 'Record'].join(',')];
      recs.forEach(function (r) { lines.push([r.title, r.status, r.project, r.money || '', r.text].map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',')); });
      nlDownload(fam.id.toLowerCase() + '-' + fam.variant.toLowerCase() + '-selection.csv', lines.join('\n'));
    });
    function loadViews() { try { return JSON.parse(localStorage.getItem(storage) || '[]'); } catch (e) { return []; } }
    function renderViews() {
      var hostV = $('[data-nl-custom-views]', views); hostV.innerHTML = '';
      loadViews().forEach(function (v, i) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = v.name;
        b.addEventListener('click', function () { Object.keys(state).forEach(function (k) { if (v.state[k] !== undefined && k !== 'size') state[k] = v.state[k]; }); syncControls(); paint(); nlToast('Local view “' + v.name + '” applied'); });
        b.addEventListener('contextmenu', function (e) { e.preventDefault(); var vs = loadViews(); vs.splice(i, 1); try { localStorage.setItem(storage, JSON.stringify(vs)); } catch (x) {} renderViews(); });
        hostV.appendChild(b);
      });
    }
    $('[data-nl-save]', views).addEventListener('click', function () {
      var name = window.prompt('Name this local view', 'My workspace view'); if (!name) return;
      var vs = loadViews(), snapshot = { q: state.q, status: state.status, project: state.project, sort: state.sort, group: state.group, view: state.view, page: 1 };
      vs.push({ name: name.slice(0, 40), state: snapshot }); try { localStorage.setItem(storage, JSON.stringify(vs)); } catch (e) {} renderViews(); nlToast('View saved on this device');
    });
    if (table) {
      var pop = $('[data-nl-column-pop]', bar), colBtn = $('[data-nl-columns]', bar);
      headers.forEach(function (h, i) {
        if (!h || /^actions?$/i.test(h)) return;
        var label = document.createElement('label'); label.innerHTML = '<input type="checkbox" checked> <span>' + nlEsc(h) + '</span>';
        $('input', label).addEventListener('change', function () {
          var on = this.checked, head = table.tHead.rows[0].cells[i + 1]; if (head) head.hidden = !on;
          items.forEach(function (r) { if (r.cells[i + 1]) r.cells[i + 1].hidden = !on; });
        });
        pop.appendChild(label);
      });
      colBtn.addEventListener('click', function () { var open = pop.hidden; pop.hidden = !open; colBtn.setAttribute('aria-expanded', String(open)); });
      document.addEventListener('click', function (e) { if (!e.target.closest('.nl-columns')) { pop.hidden = true; colBtn.setAttribute('aria-expanded', 'false'); } });
    }
    if (window.MutationObserver) {
      observer = new MutationObserver(function () {
        var connected = items.filter(function (el) { return el.isConnected && host.contains(el); });
        if (connected.length !== items.length) {
          items = connected;
          original = original.filter(function (el) { return items.indexOf(el) > -1; });
          Object.keys(selected).forEach(function (k) { if (!items.some(function (el) { return el.getAttribute('data-nl-key') === k; })) delete selected[k]; });
        }
        paint();
      });
    }
    renderViews(); syncControls(); paint();
    host.__nlWorkbench = { state: state, paint: paint, reset: reset };
  }

  var familyNow = nlFamily();
  $$('table').forEach(function (table) {
    if (table.closest('[data-dt],#nl-inspector,.nl-state-panel') || table.hasAttribute('data-no-workbench')) return;
    /* Document line items, quote clauses, checkout and payment-event records are
       not collections to bulk-edit. Their hand-authored workflows stay intact. */
    if (familyNow && /^(F11|F16|F17)$/.test(familyNow.id)) return;
    if (!table.tBodies[0]) return;
    var rows = $$('tr', table.tBodies[0]).filter(function (r) { return !r.hasAttribute('data-static') && !r.classList.contains('sum') && !r.classList.contains('total') && r.cells.length > 1; });
    if (rows.length >= 2) nlCollection(table, rows, table);
  });
  $$('[data-nl-list]').forEach(function (host) {
    if (host.closest('[data-dt],#nl-inspector')) return;
    var selector = host.getAttribute('data-nl-list');
    var items = selector ? $$(selector, host).filter(function (el) { return el.parentElement === host || el.closest('[data-nl-list]') === host; }) : Array.prototype.filter.call(host.children, function (el) { return el.tagName !== 'H2' && el.tagName !== 'H3'; });
    items = items.filter(function (el) { return !el.classList.contains('nl-group-heading'); });
    if (items.length >= 2) nlCollection(host, items, null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/^(input|textarea|select)$/i.test(document.activeElement.tagName) && !document.activeElement.isContentEditable && !$('[data-dt-q]')) {
      var q = $('[data-nl-q]'); if (q) { e.preventDefault(); q.focus(); }
    }
  });

  /* ---------------------------------------------------- v2.1 state simulator */
  function nlStatePanel(state) {
    var title = 'Nothing here yet', copy = 'This local empty preview keeps the next step clear. Return to Live to restore every loaded record.', actions = '';
    if (state === 'error') { title = 'We could not refresh this view'; copy = 'The service did not return usable data. Your loaded workspace is unchanged; retry or open a support thread with this context.'; }
    if (state === 'degraded') { title = 'Projects service degraded · 502'; copy = 'GET /api/v1/projects returned 502 origin_bad_gateway with CORS in the audit. Cached snapshot: 25 Oct 2026, 42 minutes old. Retry never pretends the outage is fixed.'; }
    if (state === 'loading') return '<section class="nl-state-panel" aria-busy="true" aria-label="Loading preview"><div class="nl-state-skel"><span class="skel" style="width:42%"></span><span class="skel"></span><span class="skel"></span><div class="nl-state-skel__grid"><span class="skel"></span><span class="skel"></span><span class="skel"></span></div><span class="skel" style="height:140px"></span></div><p>Loading the workspace without shifting its layout…</p></section>';
    actions = '<button class="btn btn-p" type="button" data-nl-state-retry>Retry</button><a class="btn btn-s" href="../../F12-messages-home/V1/index.html">Open support</a><button class="btn btn-g" type="button" data-state-switch="live">Return to live</button>';
    if (state === 'empty') {
      var emptyFam = nlFamily();
      var emptyHref = '../../F06-new-request/V1/index.html', emptyLabel = 'Start a request';
      if (emptyFam && /^(F01|F02)$/.test(emptyFam.id)) { emptyHref = '../../F01-auth-login/V1/index.html'; emptyLabel = 'Return to sign in'; }
      else if (emptyFam && /^(F14|F15|F16|F17|F18)$/.test(emptyFam.id)) { emptyHref = '../../F14-billing/V1/index.html'; emptyLabel = 'Open billing'; }
      else if (emptyFam && /^(F12|F13)$/.test(emptyFam.id)) { emptyHref = '../../F12-messages-home/V1/index.html'; emptyLabel = 'Open messages'; }
      else if (emptyFam && /^F23$/.test(emptyFam.id)) { emptyHref = '../../F23-explore/V1/index.html'; emptyLabel = 'Browse Explore'; }
      actions = '<a class="btn btn-p" href="' + emptyHref + '">' + emptyLabel + '</a><button class="btn btn-s" type="button" data-state-switch="live">Restore loaded view</button>';
    }
    return '<section class="nl-state-panel ' + (state !== 'empty' ? 'nl-state-panel--error' : '') + '" role="' + (state === 'empty' ? 'status' : 'alert') + '"><span class="tag ' + (state === 'empty' ? '' : 'tag--err') + '">' + (state === 'empty' ? 'Empty preview' : 'Honest recovery state') + '</span><h2 class="mt3">' + title + '</h2><p>' + copy + '</p><div class="actions">' + actions + '</div></section>';
  }
  function nlSetState(state, updateURL) {
    var main = document.querySelector('main'); if (!main) return;
    $$('.nl-state-panel', main).forEach(function (p) { p.remove(); });
    $$('[data-live-content]').forEach(function (el) { el.hidden = state === 'loading' || state === 'error'; });
    $$('[data-skel-target]').forEach(function (el) { el.hidden = state !== 'loading'; });
    var demoErr = $('[data-demo-error]'); if (demoErr) demoErr.hidden = state !== 'error';
    if (!state || state === 'live') main.removeAttribute('data-nl-state');
    else { main.setAttribute('data-nl-state', state); nlAdd(main, nlStatePanel(state), true); }
    $$('[data-state-switch]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-state-switch') === (state || 'live'))); });
    if (updateURL) {
      try {
        var u = new URL(location.href); if (!state || state === 'live') u.searchParams.delete('state'); else u.searchParams.set('state', state);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch (e) {}
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-state-switch]'); if (!b) return;
    var state = b.getAttribute('data-state-switch');
    if (state === 'loading') {
      nlSetState('loading', true);
      setTimeout(function () { if (document.querySelector('main[data-nl-state="loading"]')) nlSetState('live', true); }, 1400);
    } else nlSetState(state, true);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-nl-state-retry]'); if (!b) return;
    var previous = document.querySelector('main').getAttribute('data-nl-state') || 'error';
    nlSetState('loading', false); b.disabled = true;
    setTimeout(function () { nlSetState(previous === 'degraded' ? 'degraded' : 'error', false); nlToast(previous === 'degraded' ? 'Projects still returns 502; cached data remains available' : 'The service is still unavailable; your local view is unchanged', { type: 'warn', ms: 3600 }); }, 1100);
  });
  var requestedState = new URLSearchParams(location.search).get('state');
  if (requestedState && /^(empty|loading|error|degraded)$/.test(requestedState)) nlSetState(requestedState, false);

  /* keep ?theme= stable across internal variant links */
  var theme = new URLSearchParams(location.search).get('theme');
  if (theme) {
    $$('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || /^(#|https?:|mailto:)/.test(h) || h.indexOf('theme=') > -1) return;
      a.setAttribute('href', h + (h.indexOf('?') > -1 ? '&' : '?') + 'theme=' + encodeURIComponent(theme));
    });
  }
})();
