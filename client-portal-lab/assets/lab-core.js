/* Client Portal Lab — shared behaviour primitives (F14–F18 runs).
   Hand-written utility layer: theme, drawer, Explore popover, real-action command
   palette, accessible dialog (focus trap / Esc / focus restore), toasts, honest
   state switcher, ARIA tabs, IntersectionObserver reveals.
   It generates NO designs and NO variant markup. Each variant writes its own JS. */
(function(){
 'use strict';
 var $=function(s,r){return (r||document).querySelector(s)};
 var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var lastFocus=null, state='data', actions=[];
 function toast(m){var t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('on')},2600)}
 function openDlg(title,desc,html,focusFirst){var s=$('#scrim');if(!s)return;lastFocus=document.activeElement;
  $('#dlgt').textContent=title;var d=$('#dlgdesc');if(d)d.textContent=desc||'';var b=$('#dlgbody');if(b){b.onkeydown=null;b.innerHTML=html||''}
  s.classList.add('on');document.body.style.overflow='hidden';
  setTimeout(function(){var f=b&&b.querySelector(focusFirst||'button, a, input');(f||$('#dlgx')).focus()},20)}
 function closeDlg(){var s=$('#scrim');if(!s||!s.classList.contains('on'))return;s.classList.remove('on');document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
 function setState(s){state=s;$$('[data-state]').forEach(function(b){var on=b.dataset.state===s;b.setAttribute('aria-pressed',String(on));b.classList.toggle('on',on)});
  $$('[data-panel]').forEach(function(p){p.hidden=p.dataset.panel!==s});
  if(window.Lab&&Lab.onState)try{Lab.onState(s)}catch(e){}}
 function palette(){if(!$('#cmdk'))return;openDlg('Command palette','Real lab routes only — ↑↓ navigate, ↵ open, esc close. No invented actions.',
   '<ul style="list-style:none;margin:0;padding:0;max-height:44vh;overflow:auto">'+actions.map(function(a,i){
    return '<li><a href="'+a[1]+'" data-pi="'+i+'" style="display:block;padding:9px 10px;border-radius:7px;font-size:13px;font-weight:600">'+(i===0?'→ ':'&nbsp;&nbsp;')+a[0]+'</a></li>'}).join('')+'</ul>','a[data-pi]');
  var b=$('#dlgbody'),idx=0,links=$$('a[data-pi]',b);
  function hi(){links.forEach(function(l,i){l.style.background=i===idx?'var(--brand-50)':'';l.innerHTML=(i===idx?'→ ':'&nbsp;&nbsp;')+actions[i][0]})}hi();
  b.tabIndex=0;b.focus();
  b.onkeydown=function(e){if(e.key==='ArrowDown'){e.preventDefault();idx=(idx+1)%links.length;hi()}
   else if(e.key==='ArrowUp'){e.preventDefault();idx=(idx-1+links.length)%links.length;hi()}
   else if(e.key==='Enter'){e.preventDefault();location.href=actions[idx][1]}}}
 /* tablists marked data-local own their keyboard + panel behaviour (variants do it) */
 function tabs(){$$('[role=tablist]:not([data-local])').forEach(function(list){var ts=$$('[role=tab]',list);
  function select(t,focus){ts.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;var p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on});if(focus)t.focus();
   var h=t.getAttribute('data-tab');if(h&&history.replaceState)history.replaceState(null,'','?tab='+h)}
  ts.forEach(function(t,i){t.addEventListener('click',function(){select(t,false)});
   t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var d=e.key==='ArrowRight'?1:-1;select(ts[(i+d+ts.length)%ts.length],true)}else if(e.key==='Home'){e.preventDefault();select(ts[0],true)}else if(e.key==='End'){e.preventDefault();select(ts[ts.length-1],true)}})});
  var q=new URLSearchParams(location.search).get('tab');var initial=ts.filter(function(t){return t.getAttribute('data-tab')===q})[0]||ts[0];if(initial)select(initial,false)})}
 function reveals(){if(!('IntersectionObserver'in window)){$$('.reveal').forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.06});$$('.reveal').forEach(function(e){io.observe(e)})}
 function countUp(sel){if(reduce||!('IntersectionObserver'in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,end=+el.dataset.count,t0=null;
   function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/720);var v=Math.round(end*(1-Math.pow(1-k,3)));el.innerHTML='₹'+v.toLocaleString('en-IN')+'<span style="font-weight:400;color:var(--muted-foreground)">.00</span>';if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step);io.unobserve(el)})});$$(sel||'[data-count]').forEach(function(e){io.observe(e)})}
 function init(opts){opts=opts||{};actions=opts.actions||[];
  var root=document.documentElement;
  var tb=$('#theme');if(tb){tb.setAttribute('aria-pressed',String(root.classList.contains('dark')));tb.addEventListener('click',function(){var d=!root.classList.contains('dark');root.classList.toggle('dark',d);tb.setAttribute('aria-pressed',String(d));try{localStorage.setItem('lab-theme',d?'dark':'light')}catch(e){};toast(d?'Dark theme':'Light theme')})}
  var bg=$('#burger'),sd=$('#side');if(bg&&sd)bg.addEventListener('click',function(){var o=sd.classList.toggle('on');bg.setAttribute('aria-expanded',String(o))});
  var ex=$('#explore'),pop=$('#pop');if(ex&&pop){ex.addEventListener('click',function(){var o=pop.classList.toggle('on');ex.setAttribute('aria-expanded',String(o))});document.addEventListener('click',function(e){if(!e.target.closest('#pop')&&!e.target.closest('#explore')){pop.classList.remove('on');ex.setAttribute('aria-expanded','false')}})}
  var sc=$('#scrim');if(sc){$('#dlgx').addEventListener('click',closeDlg);sc.addEventListener('click',function(e){if(e.target===this)closeDlg()});
   sc.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();closeDlg()}
    if(e.key==='Tab'){var f=$$('button,input,a,select,textarea,[tabindex]',sc).filter(function(x){return !x.hidden&&!x.disabled&&x.offsetParent!==null});if(!f.length)return;var a=f[0],b=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus()}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus()}}})}
  var cm=$('#cmdk');if(cm)cm.addEventListener('click',palette);
  document.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palette()}if(e.key==='Escape')closeDlg()});
  $$('[data-state]').forEach(function(b){b.addEventListener('click',function(){setState(b.dataset.state)})});
  var retry=$('#retry');if(retry)retry.addEventListener('click',function(){setState('loading');setTimeout(function(){setState('data');toast('Reloaded — showing captured data')},650)});
  /* Captured-shell links to families outside this lab build: honest demo navigation. */
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-demo-nav]');if(!a)return;e.preventDefault();var n=a.getAttribute('data-demo-nav');
   openDlg(n+' — outside this lab build','Honest demo navigation from the captured sidebar.','<p>The captured shell links to <b>'+n+'</b>, but this lab delivers only the five money-screen families F14–F18. The link is not dead: it explains the boundary and offers the gallery.</p><div class="row"><a class="btn pri" href="../../../index.html">Open lab gallery</a><button class="btn" id="dismiss">Stay here</button></div>');
   var d=$('#dismiss');if(d)d.onclick=closeDlg});
  tabs();reveals();countUp(opts.countSel);
  if(opts.onState)Lab.onState=opts.onState;
  setState('data');
  return Lab}
 var Lab={$:$,$$:$$,init:init,toast:toast,openDlg:openDlg,closeDlg:closeDlg,setState:setState,palette:palette,tabs:tabs,countUp:countUp,
  get state(){return state},get actions(){return actions},get reduce(){return reduce}};
 window.Lab=Lab;
})();
