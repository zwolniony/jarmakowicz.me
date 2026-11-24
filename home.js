// Landing page interactions: reveal on scroll, count-up numbers and a header line
// on scroll. Content is visible without JS, and motion is skipped for reduced-motion users.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = [].slice.call(document.querySelectorAll('.rv'));

  // Reveal: never leave content hidden.
  function showAll() { els.forEach(function (e) { e.classList.add('in'); }); }
  if (reduce || !('IntersectionObserver' in window)) { showAll(); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(e); });
    setTimeout(showAll, 3000);
  }

  // Count-up for big numbers.
  var nums = [].slice.call(document.querySelectorAll('[data-count]'));
  function fmt(n) { return n.toLocaleString('en-GB'); }
  function run(el) {
    var end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) return;
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(Math.round(end * e)) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); nio.unobserve(en.target); } });
    }, { threshold: .6 });
    nums.forEach(function (n) { nio.observe(n); });
  }

  // Header line once scrolled.
  var top = document.querySelector('.top');
  addEventListener('scroll', function () { top && top.classList.toggle('scrolled', scrollY > 10); }, { passive: true });


})();
