document.documentElement.classList.add('js');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}else if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}));}


document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&nav?.classList.contains('open')){
    toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');toggle.focus();
  }
});
document.addEventListener('click',event=>{
  if(nav?.classList.contains('open')&&!nav.contains(event.target)&&!toggle.contains(event.target)){
    toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');
  }
});

const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const lightboxImage=lightbox.querySelector('img');
  const lightboxCaption=lightbox.querySelector('.lightbox-caption');
  const closeButton=lightbox.querySelector('.lightbox-close');
  let lastTrigger=null;
  const closeLightbox=()=>{
    lightbox.hidden=true;document.body.style.overflow='';
    if(lastTrigger) lastTrigger.focus();
  };
  document.querySelectorAll('[data-lightbox]').forEach(figure=>{
    figure.setAttribute('tabindex','0');
    figure.setAttribute('role','button');
    figure.setAttribute('aria-label','Agrandir cette capture');
    const open=()=>{
      const img=figure.querySelector('img');
      lastTrigger=figure;
      lightboxImage.src=img.currentSrc||img.src;
      lightboxImage.alt=img.alt;
      lightboxCaption.textContent=img.alt;
      lightbox.hidden=false;document.body.style.overflow='hidden';closeButton.focus();
    };
    figure.addEventListener('click',open);
    figure.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
  });
  closeButton.addEventListener('click',closeLightbox);
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!lightbox.hidden)closeLightbox();});
}
