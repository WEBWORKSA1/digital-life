/* Digital.Life site runtime: chrome, forms, live feeds, ads, consent */
(function(){
var S=document.currentScript,R=S.getAttribute('data-root')||'',D=document;
/* ---- owner config: paste values here, nothing else needs editing ---- */
var CFG={
  ads:{top:'',mid:'',foot:''},      /* AdSense ad-unit slot IDs (optional; Auto ads work without them) */
  pay:{once:'',monthly:''}          /* payment links (PayPal, Stripe, Ko-fi...) for the Support page */
};
var PUB='ca-pub-6620975821265271';
function $(s,c){return(c||D).querySelector(s)}
function $$(s,c){return[].slice.call((c||D).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function safe(u){return/^https?:\/\//i.test(u||'')?u:'#'}
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
window.DL={$:$,$$:$$,esc:esc,store:store,R:R,CFG:CFG};

/* theme */
var th=store('dl_theme');
if(!th&&window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches)th='dark';
if(th)D.documentElement.setAttribute('data-theme',th);

/* header + footer */
var NAV=[['tools/digital-life-score.html','Life Score'],['tools/index.html','Tools'],['guides/index.html','Guides'],['radar.html','Radar'],['videos.html','Videos'],['glossary.html','Glossary'],['support.html','Support']];
var h=$('#hd');
if(h){h.className='hd';
  h.innerHTML='<div class="wrap hd-in"><a class="logo" href="'+R+'index.html"><span class="dot"></span><span>Digital<b>.Life</b></span></a><button class="burger" aria-label="Menu" aria-expanded="false">&#9776;</button><nav class="nav" aria-label="Main">'+NAV.map(function(n){var on=location.pathname.slice(-n[0].length)===n[0];return'<a href="'+R+n[0]+'"'+(on?' class="on"':'')+'>'+n[1]+'</a>'}).join('')+'<a class="btn sm" href="'+R+'start.html">Free reset plan</a><button class="thm" aria-label="Toggle dark mode">&#9680;</button></nav></div>';
  var bg=$('.burger',h),nv=$('.nav',h);
  bg.onclick=function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
  $('.thm',h).onclick=function(){var d=D.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';D.documentElement.setAttribute('data-theme',d);store('dl_theme',d)};
}
var f=$('#ft');
if(f){f.className='ft';
  var L=function(p,t){return'<a href="'+R+p+'">'+t+'</a>'};
  f.innerHTML='<div class="wrap"><div class="cols"><div><a class="logo" href="'+R+'index.html"><span class="dot"></span><span>Digital<b>.Life</b></span></a><p class="mut" style="margin-top:.8rem;max-width:22rem">Independent, plain-language help for the part of your life that runs on screens: security, privacy, money, attention and legacy.</p><a class="btn sm" href="'+R+'start.html">Get the free reset plan</a></div>'+
  '<div><h4>Explore</h4>'+L('tools/digital-life-score.html','Digital Life Score')+L('tools/index.html','All tools')+L('guides/index.html','Guides')+L('radar.html','Breach &amp; alert radar')+L('videos.html','Videos')+L('glossary.html','Glossary')+L('resources.html','Resources')+'</div>'+
  '<div><h4>Get involved</h4>'+L('start.html','Free reset plan')+L('support.html','Donate &amp; sponsor')+L('community.html','Contests &amp; prizes')+L('community.html#work','Write &amp; work with us')+L('contact.html','Contact')+'</div>'+
  '<div><h4>Site</h4>'+L('about.html','About')+L('privacy.html','Privacy policy')+L('terms.html','Terms of use')+L('disclaimer.html','Disclaimer &amp; trademarks')+'<a href="https://web.works/contact" target="_blank" rel="noopener">Advertise / acquire</a></div></div>'+
  '<p class="legal">&copy; '+new Date().getFullYear()+' Digital.Life. Independent publication. &ldquo;Digital life&rdquo; is used here in its ordinary descriptive sense; this site is not affiliated with, endorsed by or connected to any company, product or service that uses similar words in its name. All trademarks belong to their respective owners. Content is general information, not professional advice. See the <a style="display:inline" href="'+R+'disclaimer.html">disclaimer</a>.</p></div>';
}

/* reveal on scroll */
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});$$('.rv').forEach(function(e){io.observe(e)})}else $$('.rv').forEach(function(e){e.classList.add('in')});

/* filter boxes: <input data-filter="#list"> hides [data-item] children that do not match */
$$('input[data-filter]').forEach(function(i){i.addEventListener('input',function(){var q=i.value.trim().toLowerCase();$$('[data-item]',$(i.getAttribute('data-filter'))).forEach(function(e){e.style.display=e.textContent.toLowerCase().indexOf(q)>-1?'':'none'})})});

/* lead / contact forms. Destination is assembled at runtime and never printed on the page. */
function ep(){return atob('=02bj5CbpFWbnBUMhN3ay92diV2d'.split('').reverse().join(''))}
$$('form[data-lead]').forEach(function(fm){
  var hp=D.createElement('input');hp.type='text';hp.name='_honey';hp.className='hp';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');fm.appendChild(hp);
  var m=D.createElement('div');m.setAttribute('role','status');fm.appendChild(m);
  fm.addEventListener('submit',function(e){
    e.preventDefault();if(hp.value)return;
    var d={},b=$('button[type=submit]',fm);new FormData(fm).forEach(function(v,k){if(k!=='_honey')d[k]=v});
    d._subject='[Digital.Life] '+fm.getAttribute('data-lead');d._template='table';d._captcha='false';d.page=location.pathname;
    if(b)b.disabled=true;m.className='msg';m.textContent='Sending…';
    fetch('https://formsubmit.co/ajax/'+ep(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
    .then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(){m.className='msg';m.innerHTML=fm.getAttribute('data-ok')||'Thank you. Your message is on its way and you will hear back soon.';fm.reset();var n=fm.getAttribute('data-next');if(n){var x=$(n);if(x){x.hidden=false;x.scrollIntoView({behavior:'smooth',block:'center'})}}})
    .catch(function(){m.className='msg err';m.innerHTML='That did not go through. Please try again, or use the contact link at the very top of this page.'})
    .then(function(){if(b)b.disabled=false});
  });
});

/* support page payment buttons */
$$('[data-pay]').forEach(function(a){var u=CFG.pay[a.getAttribute('data-pay')];if(u){a.href=u;a.target='_blank';a.rel='noopener'}});

/* manual ad units (only rendered when a slot ID is configured) */
$$('.adslot[data-ad]').forEach(function(d){var id=CFG.ads[d.getAttribute('data-ad')];if(!id)return;d.innerHTML='<ins class="adsbygoogle" style="display:block" data-ad-client="'+PUB+'" data-ad-slot="'+esc(id)+'" data-ad-format="auto" data-full-width-responsive="true"></ins>';try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});

/* cookie notice */
if(!store('dl_ck')){var c=D.createElement('div');c.className='ck';c.innerHTML='<span>This site uses cookies for preferences, analytics and advertising (Google AdSense). See the <a href="'+R+'privacy.html">privacy policy</a>.</span><button class="btn sm hi">OK</button>';D.body.appendChild(c);$('button',c).onclick=function(){store('dl_ck',1);c.remove()}}

/* ---------- live, self-updating data ---------- */
var J='https://api.rss2json.com/v1/api.json?rss_url=';
function cached(k,hrs,fn){var c=store(k);if(c&&Date.now()-c.t<hrs*36e5)return Promise.resolve(c.d);return fn().then(function(d){store(k,{t:Date.now(),d:d});return d})}
function rss(u){return fetch(J+encodeURIComponent(u)).then(function(r){return r.json()}).then(function(j){if(j.status!=='ok'||!j.items)throw 0;return j})}
function dt(s){var d=new Date(String(s||'').replace(' ','T'));return isNaN(d)?'':d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
function ts(s){var d=new Date(String(s||'').replace(' ','T'));return isNaN(d)?0:+d}
var NEWS=[['CISA advisories','https://www.cisa.gov/cybersecurity-advisories/all.xml'],['FTC consumer protection','https://www.ftc.gov/feeds/press-release-consumer-protection.xml'],['UK NCSC','https://www.ncsc.gov.uk/api/1/services/v1/all-rss-feed.xml'],['EFF','https://www.eff.org/rss/updates.xml'],['Krebs on Security','https://krebsonsecurity.com/feed/'],['BleepingComputer','https://www.bleepingcomputer.com/feed/']];
var CH=[['Computerphile','UC9-y-6csu5WGm29I7JiwpnA'],['TED','UCAuUUnT6oDeKwE6v1NGQxug'],['Marques Brownlee','UCBJycsmduvYEL83R_U4JriQ'],['Two Minute Papers','UCbfYPyITQ-7l4upoX8nvctg'],['Linus Tech Tips','UCXuqSBlHAE6Xw-yeJA0Tunw']];
function many(list,toUrl,per,map){return Promise.all(list.map(function(n){return rss(toUrl(n)).then(function(j){return j.items.slice(0,per).map(function(i){return map(n,i)})}).catch(function(){return[]})})).then(function(a){var o=[].concat.apply([],a).filter(Boolean);if(!o.length)throw 0;return o.sort(function(x,y){return y.d-x.d})})}
var LOAD={
  news:function(){return cached('dl_news',3,function(){return many(NEWS,function(n){return n[1]},6,function(n,i){return{s:n[0],t:i.title,l:i.link,d:ts(i.pubDate)}})})},
  videos:function(){return cached('dl_vids',6,function(){return many(CH,function(n){return'https://www.youtube.com/feeds/videos.xml?channel_id='+n[1]},4,function(n,i){var m=/[?&]v=([\w-]{11})/.exec(i.link||'');return m?{s:n[0],t:i.title,id:m[1],d:ts(i.pubDate)}:null})})},
  breaches:function(){return cached('dl_br',6,function(){return fetch('https://haveibeenpwned.com/api/v3/breaches').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(a){return a.sort(function(x,y){return ts(y.AddedDate)-ts(x.AddedDate)}).slice(0,40).map(function(b){return{t:b.Title,dom:b.Domain,bd:b.BreachDate,d:ts(b.AddedDate),n:b.PwnCount,c:(b.DataClasses||[]).slice(0,5).join(', ')}})}).catch(function(){return rss('https://feeds.feedburner.com/HaveIBeenPwnedLatestBreaches').then(function(j){return j.items.slice(0,25).map(function(i){return{t:i.title,l:i.link,d:ts(i.pubDate)}})})})})}
};
var DRAW={
  news:function(el,a){el.innerHTML='<ul class="feed">'+a.map(function(i){return'<li><a href="'+esc(safe(i.l))+'" target="_blank" rel="noopener nofollow">'+esc(i.t)+'</a><small>'+esc(i.s)+' &middot; '+dt(i.d)+'</small></li>'}).join('')+'</ul>'},
  videos:function(el,a){el.innerHTML='<div class="vids">'+a.map(function(v){return'<div class="vid"><button data-v="'+esc(v.id)+'" aria-label="Play: '+esc(v.t)+'"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+esc(v.id)+'/hqdefault.jpg"></button><div>'+esc(v.t)+'<small>'+esc(v.s)+' &middot; '+dt(v.d)+'</small></div></div>'}).join('')+'</div>';
    $$('button[data-v]',el).forEach(function(b){b.onclick=function(){var f=D.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.getAttribute('data-v')+'?autoplay=1&rel=0';f.allow='accelerometer; autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title='Video player';b.replaceWith(f)}})},
  breaches:function(el,a){el.innerHTML='<div class="tw"><table><thead><tr><th>Breach</th><th>When</th><th>Accounts</th><th>Exposed data</th></tr></thead><tbody>'+a.map(function(b){return'<tr><td><b>'+esc(b.t)+'</b>'+(b.dom?'<br><small class="mut">'+esc(b.dom)+'</small>':'')+'</td><td>'+esc(b.bd||dt(b.d))+'</td><td>'+(b.n?Number(b.n).toLocaleString():'&mdash;')+'</td><td>'+esc(b.c||'See source')+'</td></tr>'}).join('')+'</tbody></table></div><p class="sm mut">Breach data: <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener">Have I Been Pwned</a> (CC BY 4.0). Refreshed automatically on each visit.</p>'}
};
$$('[data-feed]').forEach(function(el){var k=el.getAttribute('data-feed'),n=+el.getAttribute('data-limit')||12,fb=el.innerHTML;if(!LOAD[k])return;el.setAttribute('aria-busy','true');
  LOAD[k]().then(function(a){DRAW[k](el,a.slice(0,n))}).catch(function(){el.innerHTML=fb}).then(function(){el.removeAttribute('aria-busy')})});
})();
