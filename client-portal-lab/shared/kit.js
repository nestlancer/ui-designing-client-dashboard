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
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      setTheme(!document.documentElement.classList.contains('dark'), true);
    });
  });
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
    if (el.classList.contains('palette')) el.setAttribute('aria-hidden', 'false');
    setTimeout(function () {
      var f = $('[autofocus],input,button', el); if (f) f.focus();
    }, 40);
    el.__trap = function (e) { trap(el, e); };
    document.addEventListener('keydown', el.__trap);
  }
  function closeOverlay(el, restore) {
    if (!el) return;
    el.dataset.open = 'false';
    document.documentElement.classList.remove('lock');
    var anyOpen = $$('.sheet[data-open="true"],.palette[data-open="true"],.dialog[data-open="true"]').length;
    if (!anyOpen) { var scrim = $('[data-sheet-scrim]'); if (scrim) scrim.dataset.show = 'false'; }
    if (el.__trap) document.removeEventListener('keydown', el.__trap);
    if (restore !== false && lastFocus && document.contains(lastFocus)) lastFocus.focus();
    if (el.classList.contains('palette')) el.setAttribute('aria-hidden', 'true');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $$('.palette[data-open="true"]').forEach(function (p) { closeOverlay(p); });
      $$('.sheet[data-open="true"],.dialog[data-open="true"]').forEach(function (p) { closeOverlay(p); });
      if (document.body.classList.contains('nav-open')) nav(false);
    }
  });
  $$('[data-open-sheet],[data-open-dialog]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-open-sheet') || b.getAttribute('data-open-dialog');
      openOverlay(document.getElementById(id));
    });
  });
  $$('.sheet,.dialog,.palette').forEach(function (o) {
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
