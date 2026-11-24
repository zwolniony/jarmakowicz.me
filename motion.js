// Gentle reveal-on-scroll. Content is only hidden once this script runs,
// and everything is shown after 2.5 s regardless, so nothing can stay invisible.
(function(){
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els=[].slice.call(document.querySelectorAll('.hero .wrap > *, .block .wrap > *, .block .split > *, .work li, .skills > div, .offers article, .orbit li, .path li, .call .wrap > *'));
  if(!('IntersectionObserver' in window)) return;
  var vh=window.innerHeight;
  els.forEach(function(el,i){
    var r=el.getBoundingClientRect();
    if(r.top<vh && r.bottom>0) return;            // already on screen: leave visible
    el.classList.add('reveal');
    el.style.setProperty('--d',(i%4)*80+'ms');
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{rootMargin:'0px 0px -6% 0px',threshold:0});
  els.forEach(function(el){if(el.classList.contains('reveal'))io.observe(el)});
  setTimeout(function(){els.forEach(function(el){el.classList.add('in')})},2500);
})();
