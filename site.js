(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Year
  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  // Mobile navigation
  const toggle=$('#menuToggle'), menu=$('#mobileMenu');
  if(toggle && menu){ toggle.addEventListener('click',()=>menu.classList.toggle('hidden')); }

  // Reveal-on-scroll
  const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08});
  $$('.reveal').forEach(el=>observer.observe(el));

  // Gallery filtering
  const filterButtons=$$('.filter-btn');
  const items=$$('.filter-item');
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
    const f=btn.dataset.filter;
    filterButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    items.forEach(item=>{item.classList.toggle('hidden',!(f==='all'||item.dataset.category===f))});
  }));

  // Image/video modal
  const modal=$('#mediaModal');
  const modalImg=$('#modalImage');
  const modalVideo=$('#modalVideo');
  const modalTitle=$('#modalTitle');
  function openModal(type,src,title){
    if(!modal) return;
    modalTitle.textContent=title||'Orofila';
    if(type==='video'){
      modalImg.classList.add('hidden'); modalVideo.classList.remove('hidden'); modalVideo.src=src; modalVideo.play().catch(()=>{});
    } else {
      modalVideo.pause(); modalVideo.removeAttribute('src'); modalVideo.classList.add('hidden'); modalImg.classList.remove('hidden'); modalImg.src=src;
    }
    modal.classList.add('open'); document.body.classList.add('overflow-hidden');
  }
  function closeModal(){if(!modal)return;modal.classList.remove('open');document.body.classList.remove('overflow-hidden');modalVideo?.pause();}
  $$('.js-open-image').forEach(el=>el.addEventListener('click',()=>openModal('image',el.dataset.src||el.src,el.dataset.title)));
  $$('.js-open-video').forEach(el=>el.addEventListener('click',()=>openModal('video',el.dataset.src,el.dataset.title)));
  $('#modalClose')?.addEventListener('click',closeModal);
  modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

  // WhatsApp inquiry helper
  const phone='94780763712';
  $$('.js-whatsapp').forEach(btn=>btn.addEventListener('click',()=>{
    const product=btn.dataset.product||'';
    const msg=product?`Hi Orofila, I'm interested in ${product}. Please share availability, details and price.`:`Hi Orofila, I'd like to inquire about your gemstones and jewelry.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
  }));

  // Contact form: convert to WhatsApp enquiry
  const form=$('#inquiryForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=$('#name').value.trim(), item=$('#item').value.trim(), message=$('#message').value.trim();
    const text=`Hi Orofila, I'm ${name||'a customer'}.\nInterested in: ${item||'Gemstone / Jewelry'}\nMessage: ${message||'Please share details.'}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank');
  });

  // Simple rotating hero statement
  const rotator=$('#rotatingWord');
  if(rotator){const words=['Gemstones','Jewelry','Rare Finds','Timeless Pieces'];let i=0;setInterval(()=>{i=(i+1)%words.length;rotator.animate([{opacity:.2,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'ease-out'});rotator.textContent=words[i]},2400)}
})();
