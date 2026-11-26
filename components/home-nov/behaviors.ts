// @ts-nocheck
/* eslint-disable */
/**
 * Behaviour for the November homepage, ported from the mock's own script so the page works the way the mock did:
 * use-case demos, form chips, the video pop-out and corner pin, the demo-time picker, the team cover flow,
 * and the smooth-scroll buttons. The coach spotlight and the "ready by" date are React components instead
 * (Spotlight.tsx, ReadyDate.tsx). Everything is scoped to `root`, and the returned function undoes it all,
 * so React can mount, unmount and (in dev) double-run this safely.
 */
export function initNovemberHome(root: HTMLElement): () => void {
  var _timers = [];
  var _restore = null;
  var _setTimeout = function (fn, ms) { var id = window.setTimeout(fn, ms); _timers.push(['t', id]); return id; };
  var _setInterval = function (fn, ms) { var id = window.setInterval(fn, ms); _timers.push(['i', id]); return id; };

  /* Record every listener added during setup, so cleanup can remove exactly those */
  var _added = [];
  var _proto = EventTarget.prototype;
  var _orig = _proto.addEventListener;
  _proto.addEventListener = function (type, fn, opts) {
    if (this === window || this === document || (this instanceof Node && root.contains(this))) _added.push([this, type, fn, opts]);
    return _orig.call(this, type, fn, opts);
  };

  /* Scale the page up a little on large screens so it fills the screen like it does on a laptop */
  function fit() {
    var z = Math.min(1.7, Math.max(1, window.innerWidth / 1440));
    root.style.zoom = String(z);
    root.style.setProperty('--z', String(z));
  }
  fit();
  window.addEventListener('resize', fit);

  try {
  var who = ['Learners', 'Prospects', 'Clients', 'Cohort members', 'Internal teams'];
  var jobs = ['Ask questions', 'Practise a conversation', 'Role-play', 'Get feedback', 'Get support between sessions'];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var $ = function (id) { return root.querySelector('#' + id); };
  var still = false;
  try { still = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}




  /* How coaches use their twins: each use case shown in the product's own interface */
  var I = {
    mic: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>',
    clip: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12l-8.5 8.5a5 5 0 0 1-7-7L14 5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 8"/></svg>',
    flag: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 21V4h11l-2 4 2 4H5"/></svg>',
    end: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 14c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5a10 10 0 0 0-5 0V15l-3 1.5z"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
  };
  var face = '<span class="orb" aria-hidden="true"><i></i><i></i><i></i><span class="orb-core"><img src="/home-nov/tt-mark.png" alt="" width="40" height="40"></span></span>';
  var persona = function (label, cls) { return '<span class="pa ' + cls + '" aria-hidden="true">' + label.charAt(0) + '</span>'; };
  function call(o) {
    return '<div class="tw-call">'
      + '<div class="tw-top"><span class="tw-brand"><img src="/home-nov/tt-mark.png" alt="" width="16" height="16">TrainerTwin</span><span class="tw-pill">' + (o.left || '20 min left') + '</span></div>'
      + (o.title ? '<div class="tw-title">' + o.title + '</div>' : '')
      + '<div class="tw-tile">' + face + '<span class="tw-tag">Your twin</span></div>'
      + '<div class="tw-lines" data-lines></div>'
      + '<div class="tw-ctrl"><span' + (o.on === 'mic' ? ' class="on"' : '') + '>' + I.mic + '</span><span>' + I.chat + '</span><span' + (o.on === 'clip' ? ' class="on"' : '') + '>' + I.clip + '</span><span>' + I.flag + '</span><span class="end">' + I.end + '</span></div>'
      + '</div>';
  }
  var cases = [
    { t: 'Course Q&A', d: 'Learners ask about your course and get answers in your words, any time.',
      html: call({ on: 'mic' }),
      lines: [['me', 'Why do you open with a question instead of the pitch?'], ['sys', 'Thinking…'], ['tw', 'Because people listen better once they’ve said their problem out loud. That’s step one of the method in module 3.']] },
    { t: 'After a live class or masterclass', d: 'Learners clear their doubts that evening, with your recordings and material behind every answer.',
      html: call({ on: 'mic', left: '18 min left' }),
      lines: [['me', 'From Saturday’s masterclass: what do I do if there’s silence after the price?'], ['tw', 'Let the silence sit, then ask one open question.'], ['clipref', I.play + ' Masterclass recording · from 42:10']] },
    { t: 'Role-play practice', d: 'Learners choose a role-play, practise the conversation, then the twin debriefs them using your methodology.',
      html: '<div class="rp"><div class="rp-head">Choose a role-play</div><div class="rp-grid">'
        + [['Price objection', 'The buyer says your quote is too high.', 'g1'], ['Hesitant client', 'They like it but keep delaying the decision.', 'g2'], ['Difficult team member', 'Give feedback without losing them.', 'g3']].map(function (c, k) {
            return '<div class="rp-card ' + c[2] + (k === 0 ? ' sel' : '') + '"><div class="rp-art"><span class="rp-persona">' + persona(k === 2 ? 'Team member' : 'Buyer', 'p' + k) + '<span><b>Persona</b><small>' + (k === 2 ? 'Team member' : 'Buyer') + '</small></span></span></div><b>' + c[0] + '</b><small>' + c[1] + '</small></div>';
          }).join('') + '</div><div class="tw-lines rp-lines" data-lines></div></div>',
      lines: [['tw', 'As your buyer: “Honestly, your price is higher than the other quote.”'], ['me', 'I understand. Can I ask what’s included in theirs?'], ['db', 'Debrief: good question. Next time, acknowledge the concern first, then ask.']] },
    { t: 'Deal support', d: 'Learners share a screenshot of a real conversation with a client or buyer and get their next move.',
      html: call({ on: 'clip', left: '16 min left' }),
      lines: [['shotln', '<span class="shot-img"><i></i><i></i><i></i></span>chat-with-client.png'], ['me', 'They went quiet after my proposal. What should I send?'], ['tw', 'Check in on their timeline, not the decision: “When are you hoping to have this in place?”']] },
    { t: 'A new income stream', d: 'Embed your twin on your own website. Learners pay as they go, topping up minutes when they need them, and payments come straight to your account.',
      html: '<div class="emb"><div class="emb-bar"><i></i><i></i><i></i><span>yourwebsite.com/practice</span></div><div class="emb-page"><div class="emb-copy"><b>Practise with my twin</b><small>Ask questions and role-play any time, in my voice and style.</small><div class="emb-price">Pay as you go <span>· top up any time</span></div><span class="emb-btn">Top up 30 minutes</span></div><div class="emb-widget">' + face + '<span class="tw-tag">Your twin</span></div></div><div class="tw-lines emb-lines" data-lines></div></div>',
      lines: [['pay', '30-minute top-up received · paid straight to your account'], ['me', 'Hi! I\u2019ve topped up 30 minutes. Can we practise my pricing conversation?'], ['tw', 'Great, let\u2019s start. I\u2019ll play your buyer.']] }
  ];
  var ucSvg = function (p) { return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; };
  var UCI = [
    ucSvg('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6M12 17h.01"/>'),
    ucSvg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    ucSvg('<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>'),
    ucSvg('<path d="M21 12l-8.5 8.5a5 5 0 0 1-7-7L14 5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 8"/>'),
    ucSvg('<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-.9-1.6-1.4-2.8-1.4-1.6 0-2.8.8-2.8 2s1.2 1.7 2.8 2.1 2.8 1 2.8 2.2-1.2 2.1-2.8 2.1c-1.3 0-2.4-.6-2.9-1.5M12 6.3v1.5M12 16.2v1.5"/>')
  ];
  $('uc-list').textContent = '';
  var ucBtns = [], ucCur = -1, ucPause = 0, ucTimers = [];
  cases.forEach(function (c, i) {
    var b = el('button', 'uc-item'); b.type = 'button'; b.setAttribute('role', 'tab');
    var ic = el('i', 'uc-ic'); ic.setAttribute('aria-hidden', 'true'); ic.innerHTML = UCI[i] || '';
    var tx = el('div', 'uc-tx'); tx.appendChild(el('b', '', c.t)); tx.appendChild(el('span', '', c.d));
    b.appendChild(ic); b.appendChild(tx);
    b.addEventListener('click', function () { ucPause = Date.now() + 15000; ucShow(i); });
    $('uc-list').appendChild(b); ucBtns.push(b);
  });
  function ucShow(i) {
    ucTimers.forEach(clearTimeout); ucTimers = [];
    ucBtns.forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    ucCur = i;
    var stage = $('uc-stage');
    stage.innerHTML = '<p class="uc-desc">' + cases[i].d + '</p>' + cases[i].html + '<span class="uc-note">Example</span>';
    var box = stage.querySelector('[data-lines]');
    cases[i].lines.forEach(function (m, k) {
      ucTimers.push(_setTimeout(function () {
        var p = document.createElement('p'); p.className = 'ln ' + m[0]; p.innerHTML = m[1]; box.appendChild(p);
        var old = box.querySelector('.ln.sys'); if (old && m[0] !== 'sys') old.remove();
      }, still ? 0 : 500 + k * 1200));
    });
    var list = $('uc-list');
    if (list.scrollWidth > list.clientWidth) { try { list.scrollTo({ left: ucBtns[i].offsetLeft - list.offsetLeft - 8, behavior: still ? 'auto' : 'smooth' }); } catch (e) { list.scrollLeft = ucBtns[i].offsetLeft - list.offsetLeft - 8; } }
  }
  ucShow(0);
  _setInterval(function () { if (Date.now() < ucPause) return; ucShow((ucCur + 1) % cases.length); }, 7500);

  /* Form */
  function chips(id, labels) {
    $(id).textContent = '';
    labels.forEach(function (label) {
      var j = el('button', 'job', label);
      j.type = 'button';
      j.setAttribute('aria-pressed', 'false');
      j.addEventListener('click', function () {
        j.setAttribute('aria-pressed', j.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      });
      $(id).appendChild(j);
    });
  }
  chips('who', who);
  chips('jobs', jobs);
  var cover = $('tt-cover'), vid = $('tt-video');
  if (cover && vid) {
    /* Clicking the video pops it out, big, over the page */
    var pop = $('pop'), popSlot = $('pop-slot'), vHome = vid.parentNode, vNext = vid.nextSibling;
    function openPop() {
      popSlot.appendChild(vid);
      pop.hidden = false; root.classList.add('popping'); document.body.style.overflow = 'hidden';
      try { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
      $('pop-x').focus();
    }
    function closePop() {
      if (pop.hidden) return;
      try { vid.pause(); } catch (e) {}
      vHome.insertBefore(vid, vNext);
      pop.hidden = true; root.classList.remove('popping'); document.body.style.overflow = '';
      cover.focus();
    }
    _restore = closePop;
    cover.addEventListener('click', openPop);
    $('pop-x').addEventListener('click', closePop);
    pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });
  }
  /* Ready day: 7 days from the day the visitor is on right now, in their own time zone.
     Worked out again each time the confirmation opens, so a page left open overnight stays right. */
  var today, ready;
  function setDays() {
    today = new Date(); today.setHours(0, 0, 0, 0);
    ready = new Date(today); ready.setDate(ready.getDate() + 7);
  }
  setDays();
  function fmt(d, o) { try { return d.toLocaleDateString('en-GB', o); } catch (e) { return d.toDateString(); } }

  /* The strip: today (sent), six building days, then the ready day */
  function drawStrip() {
    $('strip').textContent = '';
    for (var i = 0; i <= 7; i++) {
      var d = new Date(today); d.setDate(d.getDate() + i);
      var li = el('li', 'day ' + (i === 0 ? 'sent' : i === 7 ? 'ready' : 'building'));
      li.appendChild(el('span', 'day-w', fmt(d, { weekday: 'short' })));
      li.appendChild(el('span', 'day-d', String(d.getDate())));
      li.appendChild(el('span', 'day-s', i === 0 ? 'Sent' : i === 7 ? 'Ready' : 'Building'));
      li.style.animationDelay = (0.06 * i) + 's';
      $('strip').appendChild(li);
    }
  }

  /* Times are set in India time (the team's hours) and shown in any time zone the visitor picks */
  var zones = [
    ['Asia/Kolkata', 'India'], ['Asia/Dubai', 'UAE'], ['Asia/Singapore', 'Singapore'],
    ['Europe/London', 'UK'], ['Europe/Dublin', 'Ireland'], ['Europe/Stockholm', 'Sweden'], ['Europe/Rome', 'Italy'], ['Europe/Zurich', 'Switzerland'],
    ['America/New_York', 'US Eastern'], ['America/Chicago', 'US Central'], ['America/Los_Angeles', 'US Pacific'],
    ['America/Toronto', 'Canada Eastern'], ['America/Vancouver', 'Canada Pacific'], ['Australia/Sydney', 'Australia Eastern'], ['Australia/Perth', 'Australia Western']
  ];
  var mine = ''; try { mine = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
  var alias = { 'Asia/Calcutta': 'Asia/Kolkata', 'Asia/Saigon': 'Asia/Ho_Chi_Minh', 'Europe/Kiev': 'Europe/Kyiv' };
  if (alias[mine]) mine = alias[mine];
  if (mine && !zones.some(function (z) { return z[0] === mine; })) zones.unshift([mine, mine.split('/').pop().replace(/_/g, ' ')]);
  var sel = $('tz-select');
  sel.textContent = '';
  zones.forEach(function (z) {
    var o = el('option', '', z[1] + ' (' + z[0].split('/').pop().replace(/_/g, ' ') + ')');
    o.value = z[0]; if (z[0] === mine) o.selected = true; sel.appendChild(o);
  });
  if (!mine) sel.value = 'Asia/Kolkata';
  function inZone(d, o) { o = Object.assign({}, o); try { o.timeZone = sel.value; return d.toLocaleString('en-GB', o); } catch (e) { delete o.timeZone; return d.toLocaleString('en-GB', o); } }
  var istSlots = [[13, 30], [15, 30], [18, 0], [20, 0]];
  var slotTimes = [];
  var picked = null;
  function drawSlots() {
    slotTimes = istSlots.map(function (hm) { return new Date(Date.UTC(ready.getFullYear(), ready.getMonth(), ready.getDate(), hm[0], hm[1]) - 330 * 60000); });
    $('slots').textContent = '';
    var readyDay = inZone(slotTimes[0], { weekday: 'short' });
    slotTimes.forEach(function (at) {
      var label = inZone(at, { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
      var day = inZone(at, { weekday: 'short' });
      if (day !== readyDay) label += ' (' + day + ')';
      var btn = el('button', 'slot', label);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', picked && picked.getTime() === at.getTime() ? 'true' : 'false');
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(root.querySelectorAll('.slot'), function (x) { x.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        picked = at; $('book').disabled = false;
      });
      $('slots').appendChild(btn);
    });
  }
  sel.addEventListener('change', drawSlots);
  drawSlots();
  function stamp(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }

  /* Sends one submission to our own /api/invite route, which forwards it to the team's sheet */
  var lead = { contact: '', link: '' };
  function send(payload) {
    return fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) { if (!res.ok) throw new Error('send failed'); });
  }
  function showError(id, msg) { var n = $(id); n.textContent = msg; n.hidden = false; }
  function hideError(id) { var n = $(id); n.hidden = true; n.textContent = ''; }

  $('book').addEventListener('click', function () {
    if (!picked) return;
    var btn = $('book'), at = picked;
    var end = new Date(at.getTime() + 30 * 60000);
    var when = inZone(at, { weekday: 'long', day: 'numeric', month: 'long' }) + ', ' + inZone(at, { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase() + ', ' + sel.options[sel.selectedIndex].text;
    hideError('book-error');
    btn.disabled = true;
    send({ contact: lead.contact, link: lead.link, goals: 'Demo time chosen', slot: at.toISOString(), slot_text: when, timezone: sel.value, source: 'home-nov-booking' }).then(function () {
      $('booked-when').textContent = when;
      $('cal-add').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent('Meet my TrainerTwin')
        + '&dates=' + stamp(at) + '/' + stamp(end)
        + '&details=' + encodeURIComponent('The TrainerTwin team shows me the demo twin they built from my public content.');
      $('slots-wrap').hidden = true;
      $('booked').hidden = false;
      btn.disabled = false;
    }).catch(function () {
      btn.disabled = false;
      showError('book-error', 'We could not save that time. Please try again, or use the box below the form and we will pick a time with you.');
    });
  });

  /* Back buttons: return to the form, or back to the times */
  $('back-time').addEventListener('click', function () {
    $('booked').hidden = true;
    $('slots-wrap').hidden = false;
  });
  $('back-form').addEventListener('click', function () {
    $('done').hidden = true;
    $('booked').hidden = true;
    $('slots-wrap').hidden = false;
    $('form').hidden = false;
    $('form').scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
  });

  /* Spam protection: a hidden field people never see (bots fill it in) and a minimum time on the page */
  var openedAt = Date.now();
  /* Small (i) buttons: tap to show why we ask */
  Array.prototype.forEach.call(root.querySelectorAll('.ib'), function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var tip = $(b.getAttribute('aria-controls')), open = b.getAttribute('aria-expanded') === 'true';
      Array.prototype.forEach.call(root.querySelectorAll('.ib'), function (o) { o.setAttribute('aria-expanded', 'false'); $(o.getAttribute('aria-controls')).hidden = true; });
      if (!open) { b.setAttribute('aria-expanded', 'true'); tip.hidden = false; }
    });
  });
  document.addEventListener('click', function () {
    Array.prototype.forEach.call(root.querySelectorAll('.ib'), function (o) { o.setAttribute('aria-expanded', 'false'); $(o.getAttribute('aria-controls')).hidden = true; });
  });

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    if ($('tt-company').value || Date.now() - openedAt < 3000) return;
    var contact = $('tt-contact').value.trim();
    hideError('form-error');
    $('tt-contact').classList.remove('need');
    if (!contact) {
      $('tt-contact').classList.add('need');
      $('tt-contact').focus();
      showError('form-error', 'Add an email or WhatsApp number so we know where to send your demo.');
      return;
    }
    var link = $('tt-link').value.trim();
    var chosen = function (id) { return Array.prototype.map.call(root.querySelectorAll('#' + id + ' .job[aria-pressed="true"]'), function (b) { return b.textContent; }); };
    var submit = $('form').querySelector('button[type="submit"]');
    submit.disabled = true;
    send({ contact: contact, link: link, audience: chosen('who').join(', '), goals: chosen('jobs').join(', '), source: 'home-nov' }).then(function () {
      lead.contact = contact; lead.link = link;
      setDays(); drawStrip(); drawSlots();
      $('form').hidden = true;
      $('done').hidden = false;
      submit.disabled = false;
      $('done').scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    }).catch(function () {
      submit.disabled = false;
      showError('form-error', 'We could not send that. Please check your connection and try again.');
    });
  });
  /* Touch to pop */
  var poppable = Array.prototype.slice.call(root.querySelectorAll('.pair figure, .note'));
  function setPop(node, on) {
    node.classList.toggle('pop', on);
    node.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  poppable.forEach(function (node) {
    node.tabIndex = 0;
    node.setAttribute('role', 'button');
    node.setAttribute('aria-pressed', 'false');
    function toggle() {
      var on = !node.classList.contains('pop');
      poppable.forEach(function (other) { setPop(other, false); });
      setPop(node, on);
    }
    node.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      if (e.key === 'Escape') setPop(node, false);
    });
  });
  document.addEventListener('click', function () {
    poppable.forEach(function (node) { setPop(node, false); });
  });


  /* Doubts box */
  $('doubts').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('tt-doubt');
    if (!v.value.trim()) { v.focus(); v.classList.add('need'); return; }
    v.classList.remove('need');
    var go = $('doubts').querySelector('button[type="submit"]');
    go.disabled = true;
    send({ contact: v.value.trim(), goals: 'Still having doubts, reply within 24 hours', source: 'home-nov-doubts' }).then(function () {
      $('doubts-row').hidden = true; $('doubts-thanks').hidden = false;
    }).catch(function () {
      go.disabled = false;
      v.classList.add('need');
    });
  });

  /* Video card: tilts towards the pointer, then pins to the corner once the hero is half gone */
  var slot = $('screen-slot'), scr = $('screen'), pinX = $('pin-x'), heroEl = $('twin');
  var tiltOn = false, pinned = false, dismissed = false;
  _setTimeout(function () { tiltOn = true; }, still ? 0 : 1200);
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !still) {
    slot.addEventListener('pointermove', function (e) {
      if (!tiltOn || pinned) return;
      var r = slot.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      scr.style.transform = 'perspective(1100px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg)';
    });
    slot.addEventListener('pointerleave', function () { scr.style.transform = ''; });
  }
  function setPin(on) {
    if (on === pinned) return;
    pinned = on;
    scr.style.transform = '';
    scr.classList.toggle('pinned', on);
    scr.classList.remove('pin-in', 'pin-out'); void scr.offsetWidth;
    scr.classList.add(on ? 'pin-in' : 'pin-out');
    pinX.hidden = !on;
  }
  pinX.addEventListener('click', function (e) { e.stopPropagation(); dismissed = true; setPin(false); });
  function checkPin() {
    var r = heroEl.getBoundingClientRect();
    var gone = r.bottom < (window.innerHeight || 800) * 0.5 + r.height * 0.0 && r.bottom < r.height * 0.5;
    if (!gone) dismissed = false;
    setPin(gone && !dismissed);
  }
  window.addEventListener('scroll', checkPin, { passive: true });
  window.addEventListener('resize', checkPin);
  checkPin();


  /* Team: cover flow. The centre person is large; neighbours shrink and fade. */
  var TEAM = [{"n": "Shanmuga Anandaraman", "tag": "Co-founder & CEO", "role": "Co-founder & CEO", "cred": "Ex-Director of Product, Freshworks", "li": "https://www.linkedin.com/in/shyamanandaraman/"}, {"n": "Harini Shekar", "tag": "Co-founder & CTO", "role": "Co-founder & CTO", "cred": "Ex-AI Director, PayPal", "li": "https://www.linkedin.com/in/harini-shekar/"}, {"n": "Dharshini Jenefer", "tag": "Head of Partnerships", "role": "Head of Partnerships", "cred": "MA Education, Azim Premji University", "li": "https://www.linkedin.com/in/dharshini-jenefer-b8445398/"}, {"n": "Catherine Nivedha", "tag": "Growth & Product", "role": "Growth & Product", "cred": "British Council coach, 9 years", "li": "https://www.linkedin.com/in/catherine-nivedha-7a27811b0/"}, {"n": "Lalith Kumar", "tag": "GTM Engineer", "role": "GTM Engineer", "cred": "Ex-co-founder, Cliency", "li": "https://www.linkedin.com/in/lalithlogs/"}, {"n": "Surya Umapathy", "tag": "AI Engineer", "role": "Founding AI Engineer", "cred": "Ex-Freshworks", "li": "https://www.linkedin.com/in/suryaumapathy2812/"}, {"n": "Bhuvan T", "tag": "Designer", "role": "Founding Designer", "cred": "Ex-Freshworks", "li": "https://www.linkedin.com/in/bhuvanui/"}, {"n": "Sandhya Shanmuga Sundaram", "tag": "Admin & HR", "role": "Admin & HR", "cred": "Ex-Siemens (US) · Ex-Amazon (India)", "li": ""}];
  var cfCards = Array.prototype.slice.call(root.querySelectorAll('.cf-card')), cfCur = 4, cfHold = false, cfPause = 0;
  var SC = [1, .78, .6, .46], OP = [1, 1, .55, .3], GAP = [0, 10, 46, 64];
  function cfLayout() {
    var W = window.innerWidth < 640 ? 150 : 260, n = cfCards.length;
    var xs = [0], w = function (k) { return W * SC[k]; };
    for (var k = 1; k < SC.length; k++) xs[k] = xs[k - 1] + w(k - 1) / 2 + GAP[k] + w(k) / 2;
    cfCards.forEach(function (c, i) {
      var d = i - cfCur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
      var a = Math.abs(d), on = a < SC.length;
      c.style.width = W + 'px';
      c.style.transform = 'translate(-50%,-50%) translateX(' + (on ? (d < 0 ? -xs[a] : xs[a]) : (d < 0 ? -1 : 1) * (xs[SC.length - 1] + W)) + 'px) scale(' + (on ? SC[a] : .3) + ')';
      c.style.opacity = on ? OP[a] : 0;
      c.style.zIndex = 10 - a;
      c.style.filter = a >= 2 ? 'grayscale(1) brightness(1.15)' : 'none';
      c.classList.toggle('cur', d === 0);
      c.tabIndex = on ? 0 : -1;
      c.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    var p = TEAM[cfCur];
    $('cf-name').textContent = p.n;
    $('cf-role').textContent = p.role + ' \u00b7 ' + p.cred;
    var li = $('cf-li'); li.hidden = !p.li; if (p.li) { li.href = p.li; li.setAttribute('aria-label', p.n + ' on LinkedIn'); }
  }
  function cfGo(i) { cfCur = (i + cfCards.length) % cfCards.length; cfLayout(); }
  cfCards.forEach(function (c, i) {
    c.addEventListener('click', function (e) { if (i !== cfCur) { e.preventDefault(); cfPause = Date.now() + 10000; cfGo(i); } });
  });
  var cfBox = $('cf');
  if (window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    cfBox.addEventListener('mouseenter', function () { cfHold = true; });
    cfBox.addEventListener('mouseleave', function () { cfHold = false; });
  }
  cfBox.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { cfPause = Date.now() + 10000; cfGo(cfCur + 1); }
    if (e.key === 'ArrowLeft') { cfPause = Date.now() + 10000; cfGo(cfCur - 1); }
  });
  /* Any touch or press stops the row, so a tap always lands on the person you aimed at */
  ['pointerdown', 'touchstart', 'focusin'].forEach(function (ev) { cfBox.addEventListener(ev, function () { cfPause = Date.now() + 20000; }, { passive: true }); });
  $('cf-prev').addEventListener('click', function () { cfPause = Date.now() + 20000; cfGo(cfCur - 1); });
  $('cf-next').addEventListener('click', function () { cfPause = Date.now() + 20000; cfGo(cfCur + 1); });
  /* Drag with the mouse */
  var dx0 = null, dragged = false, stage = $('cf-stage');
  stage.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; dx0 = e.clientX; dragged = false; });
  window.addEventListener('pointermove', function (e) {
    if (dx0 === null) return;
    var d = e.clientX - dx0;
    if (Math.abs(d) > 60) { dragged = true; cfGo(cfCur + (d < 0 ? 1 : -1)); dx0 = e.clientX; }
  });
  window.addEventListener('pointerup', function () { dx0 = null; _setTimeout(function () { dragged = false; }, 0); });
  stage.addEventListener('click', function (e) { if (dragged) { e.preventDefault(); e.stopPropagation(); } }, true);
  stage.addEventListener('dragstart', function (e) { e.preventDefault(); });
  /* Sideways swipe on a trackpad */
  var wheelAt = 0;
  cfBox.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    e.preventDefault();
    if (Date.now() - wheelAt < 450) return;
    wheelAt = Date.now(); cfPause = Date.now() + 20000; cfGo(cfCur + (e.deltaX > 0 ? 1 : -1));
  }, { passive: false });
  var sx = null;
  cfBox.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  cfBox.addEventListener('touchend', function (e) {
    if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { cfPause = Date.now() + 10000; cfGo(cfCur + (dx < 0 ? 1 : -1)); }
  }, { passive: true });
  window.addEventListener('resize', cfLayout);
  cfLayout();
  if (!still) _setInterval(function () { if (cfHold || Date.now() < cfPause) return; cfGo(cfCur + 1); }, 3600);
  Array.prototype.forEach.call(root.querySelectorAll('[data-go]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('data-go');
      var target = $(id);
      if (!target) return;
      target.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
      /* Landing on the form: put keyboard focus on its first choice, without jumping the page again */
      if (id === 'build') {
        var first = target.querySelector('#who .job, #tt-contact');
        if (first) _setTimeout(function () { try { first.focus({ preventScroll: true }); } catch (err) {} }, still ? 0 : 700);
      }
    });
  });

  } finally {
    _proto.addEventListener = _orig;
  }

  return function cleanup() {
    if (_restore) { try { _restore(); } catch (e) {} }
    _added.forEach(function (a) { try { a[0].removeEventListener(a[1], a[2], a[3]); } catch (e) {} });
    _timers.forEach(function (t) { if (t[0] === 't') window.clearTimeout(t[1]); else window.clearInterval(t[1]); });
    document.body.style.overflow = '';
    root.classList.remove('popping');
  };
}
