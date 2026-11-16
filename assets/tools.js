/* Digital.Life interactive tools. Everything runs in the browser; nothing typed here is uploaded. */
(function(){
var DL=window.DL,$=DL.$,$$=DL.$$,esc=DL.esc,store=DL.store,R=DL.R,D=document,T={};
function money(n){return n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0})}

/* ---------- Digital Life Score ---------- */
var PIL={S:'Security',P:'Privacy',M:'Money',W:'Wellbeing',L:'Legacy'};
var Q=[
['S','How do you keep track of your passwords?',['A password manager, with a unique password per account','Saved in my browser or a notes file','Memory, with a few passwords reused'],'Move every login into a password manager and replace reused passwords.','guides/password-manager-setup.html'],
['S','Is two-step login switched on for your main email and your bank?',['Yes, both, using an app, key or passkey','Only one of them, or by text message only','No'],'Turn on two-step login for email first, then banking.','guides/two-factor-authentication.html'],
['S','How do your phone, computer and router get updates?',['Automatically','When I am reminded','Rarely or never'],'Switch on automatic updates and check your router firmware.','guides/secure-home-wifi.html'],
['P','When did you last review app permissions and social privacy settings?',['Within the past year','Some of them, a while ago','Never'],'Run the 30-minute privacy checkup.','guides/privacy-checkup-30-minutes.html'],
['P','Have you checked whether your email address appears in a known data breach?',['Yes, and I changed the affected passwords','I checked but did not act','No'],'Check your address and work through the breach response steps.','guides/data-breach-what-to-do.html'],
['P','A message says your account is locked and gives a link. What do you do?',['Ignore the link and open the service myself','It depends how real it looks','I usually tap the link'],'Learn the five signals that expose almost every scam message.','guides/spot-phishing-scams.html'],
['M','Do you know what you pay for subscriptions each month?',['Yes, to within a few dollars','Roughly','No idea'],'List every recurring charge with the subscription audit.','tools/subscription-audit.html'],
['M','Do you get an alert when your card or bank account is used?',['Yes, on every account','On some accounts','No'],'Enable transaction alerts in each banking and card app.','guides/data-breach-what-to-do.html'],
['M','What happens when a free trial ends?',['I set a reminder and cancel on time','I sometimes forget','I often end up paying'],'Use a cancel-by reminder every time you start a trial.','guides/cut-subscription-creep.html'],
['W','Do you know your average daily screen time?',['Yes, and I set limits','Roughly','No'],'Measure it for one week, then run the screen time calculator.','tools/screen-time-calculator.html'],
['W','Where is your phone when you sleep?',['Outside the bedroom, or silenced on a schedule','Bedside, sometimes silenced','In my hand until I fall asleep'],'Set a sleep schedule and charge the phone away from the bed.','guides/screen-time-reset.html'],
['W','Which apps are allowed to interrupt you?',['Only people and a few essentials','I have trimmed some','Almost everything'],'Cut notifications down to people and time-critical apps.','guides/screen-time-reset.html'],
['L','How are your photos and important files backed up?',['Automatically, with a second copy elsewhere','One backup, checked now and then','They are not'],'Set up a 3-2-1 backup this week.','guides/backup-3-2-1.html'],
['L','Could someone you trust reach your key accounts in an emergency?',['Yes, there is a written plan','Partly','No'],'Write a one-page digital legacy plan.','guides/digital-legacy-plan.html'],
['L','Have you set legacy or inactive-account contacts where services offer them?',['Yes, on my main accounts','On one account','No'],'Add legacy contacts on your email, phone and social accounts.','tools/digital-legacy-planner.html']
];
T.score=function(el){
  el.innerHTML='<form>'+Q.map(function(q,i){return'<fieldset class="q"><legend>'+(i+1)+'. '+esc(q[1])+' <span class="tag" style="margin:0 0 0 .4rem">'+PIL[q[0]]+'</span></legend>'+q[2].map(function(a,j){return'<label><input type="radio" name="q'+i+'" value="'+(2-j)+'" required>'+esc(a)+'</label>'}).join('')+'</fieldset>'}).join('')+'<button class="btn" type="submit">Show my Digital Life Score</button></form><div class="res" hidden style="margin-top:2rem"></div>';
  var fm=$('form',el),res=$('.res',el);
  fm.onsubmit=function(e){e.preventDefault();var tot=0,pp={},fix=[];
    Q.forEach(function(q,i){var v=+fm.elements['q'+i].value;tot+=v;pp[q[0]]=(pp[q[0]]||0)+v;if(v<2)fix.push([v,q])});
    var pct=Math.round(tot/(Q.length*2)*100),g=pct>=85?'Thriving':pct>=65?'Steady':pct>=40?'Exposed':'At risk';
    fix.sort(function(a,b){return a[0]-b[0]});
    res.hidden=false;
    res.innerHTML='<div class="card"><span class="kick">Your Digital Life Score</span><p class="big">'+pct+'<span style="font-size:.4em"> / 100</span></p><h3>'+g+'</h3><div class="grid" style="margin:1rem 0">'+Object.keys(PIL).map(function(k){var p=Math.round((pp[k]||0)/6*100);return'<div><b>'+PIL[k]+'</b> <span class="mut sm">'+p+'%</span><div class="meter"><i style="width:'+p+'%;background:'+(p>=67?'var(--acc)':p>=34?'var(--warn)':'var(--bad)')+'"></i></div></div>'}).join('')+'</div>'+(fix.length?'<h3>Your priority fixes</h3><ol>'+fix.slice(0,6).map(function(f){return'<li>'+esc(f[1][3])+' <a href="'+R+f[1][4]+'">Show me how</a></li>'}).join('')+'</ol>':'<p>No gaps found. Re-take the score every six months, because settings drift.</p>')+'</div>';
    var sv=$('#score-val');if(sv)sv.value=pct+' ('+g+')';var bx=$('#score-lead');if(bx)bx.hidden=false;
    res.scrollIntoView({behavior:'smooth',block:'start'});
  };
};

/* ---------- Password strength + passphrase generator ---------- */
var COMMON=['password','123456','qwerty','letmein','welcome','admin','iloveyou','monkey','dragon','football','abc123','111111','sunshine','princess','login','master','passw0rd','shadow','baseball','trustno1'];
var WORDS='acorn amber anchor apple arrow aspen atlas autumn badge bamboo banjo barley basil beacon berry birch bison blanket blossom bolt bongo breeze brick bridge bronze brook bubble butter cabin cactus camel candle canoe canyon carbon carpet castle cedar cello cherry cider cinder citrus clover cobalt cocoa comet copper coral cotton cradle crater cricket crystal cupola daisy denim desert dingo dolphin domino dragon drift drum eagle ember engine falcon feather fennel ferry fiddle finch flint forest fossil fox garnet gecko ginger glacier goblet granite gravel grove guitar harbor hazel helmet heron honey horizon hound iceberg indigo iris island ivory jacket jaguar jasmine jelly jigsaw juniper kayak kettle kiwi koala ladder lagoon lantern larch lemon lilac linen llama lobster lotus lunar magnet mango maple marble meadow melon meteor mint mirror mosaic moss mustard nectar noodle nutmeg oasis ocean olive onyx orbit orchid otter oyster paddle panda pebble pepper piano pickle pigeon pillow planet plum pocket pollen poplar puffin pumpkin quartz quill rabbit radish rafter raven ribbon river rocket saddle saffron salmon sandal sapphire scarf shadow sierra silver sketch sparrow spruce squid static summit sunset swan tablet tango thistle thunder tiger timber toffee tulip tundra turtle umber valley velvet violet walnut walrus willow window winter yarrow zebra zephyr zinc'.split(' ');
function span(sec){var u=[['century',3.15e9],['year',3.15e7],['day',86400],['hour',3600],['minute',60]];if(sec<1)return'instantly';if(sec>3.15e9*1e4)return'longer than recorded history';for(var i=0;i<u.length;i++){if(sec>=u[i][1]){var n=Math.round(sec/u[i][1]);return n.toLocaleString()+' '+u[i][0]+(n>1?(u[i][0]==='century'?'':'s'):'').replace('centurys','')+(u[i][0]==='century'&&n>1?' (centuries)':'')}}return Math.round(sec)+' seconds'}
function rate(p){var pool=0,fl=[],low=p.toLowerCase();if(/[a-z]/.test(p))pool+=26;if(/[A-Z]/.test(p))pool+=26;if(/\d/.test(p))pool+=10;if(/[^A-Za-z0-9]/.test(p))pool+=33;
  var bits=p.length*Math.log2(pool||1);
  if(COMMON.some(function(c){return low.indexOf(c)>-1})){bits=Math.min(bits,12);fl.push('Contains a very common password or word that attackers try first.')}
  if(/(.)\1{2,}/.test(p)){bits*=.75;fl.push('Repeated characters add length but very little strength.')}
  if(/(012|123|234|345|456|567|678|789|abc|bcd|cde|qwe|wer|asd|zxc)/i.test(p)){bits*=.8;fl.push('Keyboard and counting sequences are easy to guess.')}
  if(/(19|20)\d\d/.test(p)){bits*=.9;fl.push('Years and dates are among the first things an attacker tries.')}
  if(p.length&&p.length<12)fl.push('Under 12 characters. Length is the cheapest strength you can add.');
  return{bits:bits,fl:fl}}
T.password=function(el){
  el.innerHTML='<label>Type a password to test<input type="password" id="pw" autocomplete="off" spellcheck="false" placeholder="Checked on your device only"></label><label style="display:flex;align-items:center;gap:.5rem;font-weight:400;margin-top:.5rem"><input type="checkbox" id="pws">Show characters</label><div class="meter"><i></i></div><h3 id="pwv">Waiting for input</h3><p id="pwt" class="mut"></p><div id="pwf"></div>';
  var i=$('#pw',el),bar=$('.meter i',el);$('#pws',el).onchange=function(){i.type=this.checked?'text':'password'};
  i.oninput=function(){var p=i.value;if(!p){bar.style.width=0;$('#pwv',el).textContent='Waiting for input';$('#pwt',el).textContent='';$('#pwf',el).innerHTML='';return}
    var r=rate(p),b=r.bits,lab=b<28?'Very weak':b<45?'Weak':b<60?'Fair':b<80?'Strong':'Very strong';
    bar.style.width=Math.min(100,b/90*100)+'%';bar.style.background=b<45?'var(--bad)':b<60?'var(--warn)':'var(--acc)';
    $('#pwv',el).textContent=lab+' · about '+Math.round(b)+' bits';
    $('#pwt',el).textContent='Estimated time to crack with fast offline guessing (10 billion tries per second): '+span(Math.pow(2,b)/2/1e10)+'.';
    $('#pwf',el).innerHTML=r.fl.map(function(f){return'<div class="flag">'+f+'</div>'}).join('')};
};
T.passphrase=function(el){
  el.innerHTML='<div class="row"><label>Words<select id="ppn"><option>4</option><option>5</option><option selected>6</option><option>7</option><option>8</option></select></label><label>Separator<select id="pps"><option value="-">hyphen</option><option value=" ">space</option><option value=".">dot</option></select></label><button class="btn" id="ppg" type="button">Generate</button></div><p class="big" id="ppo" style="font-size:clamp(1.3rem,4vw,2rem);word-break:break-word;margin:1rem 0 .4rem"></p><p class="mut sm" id="ppe"></p><button class="btn ghost sm" id="ppc" type="button">Copy</button>';
  function gen(){var n=+$('#ppn',el).value,a=new Uint32Array(n),o=[];crypto.getRandomValues(a);for(var k=0;k<n;k++)o.push(WORDS[a[k]%WORDS.length]);var d=new Uint32Array(1);crypto.getRandomValues(d);o[o.length-1]+=(d[0]%90+10);
    $('#ppo',el).textContent=o.join($('#pps',el).value);$('#ppe',el).textContent='About '+Math.round(n*Math.log2(WORDS.length)+Math.log2(90))+' bits of randomness, generated on your device with the browser’s cryptographic random source. Add words for more strength.'}
  $('#ppg',el).onclick=gen;$('#ppn',el).onchange=gen;$('#pps',el).onchange=gen;
  $('#ppc',el).onclick=function(){var b=this;if(navigator.clipboard)navigator.clipboard.writeText($('#ppo',el).textContent).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1500)})};gen();
};

/* ---------- Subscription audit ---------- */
T.subs=function(el){
  var rows=store('dl_subs')||[['Video streaming',15.99,'m'],['Music',10.99,'m'],['Cloud storage',2.99,'m'],['Software plan',99,'y']];
  el.innerHTML='<div class="tw"><table><thead><tr><th>Subscription</th><th>Price</th><th>Billed</th><th></th></tr></thead><tbody></tbody></table></div><p><button class="btn ghost sm" type="button" id="sadd">+ Add subscription</button></p><div class="grid" id="sout"></div>';
  var tb=$('tbody',el);
  function draw(){tb.innerHTML=rows.map(function(r,i){return'<tr><td><input aria-label="Name" value="'+esc(r[0])+'"></td><td><input aria-label="Price" type="number" min="0" step="0.01" value="'+esc(r[1])+'"></td><td><select aria-label="Billing cycle"><option value="m"'+(r[2]==='m'?' selected':'')+'>monthly</option><option value="y"'+(r[2]==='y'?' selected':'')+'>yearly</option></select></td><td><button type="button" class="btn ghost sm" data-del="'+i+'" aria-label="Remove">&times;</button></td></tr>'}).join('');calc()}
  function read(){rows=$$('tr',tb).map(function(tr){var c=$$('input,select',tr);return[c[0].value,parseFloat(c[1].value)||0,c[2].value]})}
  function calc(){var m=rows.reduce(function(s,r){return s+(r[2]==='y'?r[1]/12:r[1])},0),rr=.07/12,fv=m*((Math.pow(1+rr,120)-1)/rr);store('dl_subs',rows);
    $('#sout',el).innerHTML=[['Per month',money(m)],['Per year',money(m*12)],['Over 10 years',money(m*120)],['If invested instead (7% a year, 10 years)',money(fv)]].map(function(x){return'<div class="card"><span class="tag">'+x[0]+'</span><p class="big" style="font-size:2rem;color:var(--ink)">'+x[1]+'</p></div>'}).join('')}
  tb.addEventListener('input',function(){read();calc()});tb.addEventListener('change',function(){read();calc()});
  tb.addEventListener('click',function(e){var d=e.target.getAttribute('data-del');if(d!==null){read();rows.splice(+d,1);draw()}});
  $('#sadd',el).onclick=function(){read();rows.push(['',0,'m']);draw();var ins=$$('tr',tb);$('input',ins[ins.length-1]).focus()};draw();
};

/* ---------- Screen time calculator ---------- */
T.screen=function(el){
  el.innerHTML='<div class="row"><label>Leisure screen time per day (hours)<input type="number" id="sth" min="0" max="18" step="0.25" value="4.5"></label><label>Your age<input type="number" id="sta" min="5" max="100" value="30"></label></div><div class="grid" id="sto" style="margin-top:1rem"></div><p id="stn" class="box"></p>';
  function go(){var h=Math.max(0,parseFloat($('#sth',el).value)||0),a=parseFloat($('#sta',el).value)||30,left=Math.max(0,80-a),dy=h*365/24;
    $('#sto',el).innerHTML=[['Full days per year',dy.toFixed(0)],['Share of waking hours',Math.round(h/16*100)+'%'],['Years of screen time by age 80',(h/24*left).toFixed(1)],['Hours per week',(h*7).toFixed(0)]].map(function(x){return'<div class="card"><span class="tag">'+x[0]+'</span><p class="big" style="font-size:2.2rem;color:var(--ink)">'+x[1]+'</p></div>'}).join('');
    $('#stn',el).innerHTML='Cutting <b>one hour a day</b> gives you back <b>365 hours a year</b>: about 15 full days, roughly 45 books at eight hours each, or a 30-minute walk every day with time to spare. Over the years to age 80 that is <b>'+(left/24).toFixed(1)+' years</b> of waking life.'}
  el.addEventListener('input',go);go();
};

/* ---------- Saved checklists ---------- */
T.checklist=function(el){
  var key='dl_chk_'+el.getAttribute('data-key'),st=store(key)||{},lis=$$('.chk li',el),bar=D.createElement('div');
  bar.innerHTML='<div class="meter"><i></i></div><p class="sm mut"><span class="cnt"></span> <button type="button" class="btn ghost sm noprint" style="margin-left:.6rem">Reset</button> <button type="button" class="btn ghost sm noprint" data-print>Print</button></p>';el.insertBefore(bar,el.firstChild);
  function up(){var n=lis.filter(function(li,i){return st[i]}).length;$('.meter i',bar).style.width=(n/lis.length*100)+'%';$('.cnt',bar).textContent=n+' of '+lis.length+' done (saved on this device)';store(key,st)}
  lis.forEach(function(li,i){var s=D.createElement('span');while(li.firstChild)s.appendChild(li.firstChild);var c=D.createElement('input');c.type='checkbox';c.checked=!!st[i];c.setAttribute('aria-label','Mark step '+(i+1)+' done');li.appendChild(c);li.appendChild(s);li.classList.toggle('done',c.checked);c.onchange=function(){st[i]=c.checked;li.classList.toggle('done',c.checked);up()}});
  $('button',bar).onclick=function(){st={};$$('input',el).forEach(function(c){c.checked=false});lis.forEach(function(li){li.classList.remove('done')});up()};
  $('[data-print]',bar).onclick=function(){window.print()};up();
};

/* ---------- Digital legacy planner ---------- */
T.legacy=function(el){
  var rows=store('dl_legacy')||[['Primary email','Email','Give access to my executor','Sealed letter with my will'],['Photo library','Photos & files','Transfer to family','Family shared album'],['Social profile','Social','Memorialize','Legacy contact set in app']];
  var CAT=['Email','Banking & money','Photos & files','Social','Subscriptions','Devices','Domains & websites','Crypto & investments','Other'],WISH=['Give access to my executor','Transfer to family','Memorialize','Close and delete','Decide later'];
  el.innerHTML='<div class="box"><b>Never type passwords here.</b> Record where instructions are kept, not the secrets themselves. This list is stored only in this browser.</div><div class="tw"><table><thead><tr><th>Account or asset</th><th>Type</th><th>My wish</th><th>Where the instructions are</th><th></th></tr></thead><tbody></tbody></table></div><p class="noprint"><button class="btn ghost sm" type="button" id="ladd">+ Add row</button> <button class="btn sm" type="button" id="lpr">Print or save as PDF</button></p>';
  var tb=$('tbody',el);function op(l,v){return l.map(function(x){return'<option'+(x===v?' selected':'')+'>'+esc(x)+'</option>'}).join('')}
  function draw(){tb.innerHTML=rows.map(function(r,i){return'<tr><td><input aria-label="Account" value="'+esc(r[0])+'"></td><td><select aria-label="Type">'+op(CAT,r[1])+'</select></td><td><select aria-label="Wish">'+op(WISH,r[2])+'</select></td><td><input aria-label="Location of instructions" value="'+esc(r[3])+'"></td><td class="noprint"><button type="button" class="btn ghost sm" data-del="'+i+'" aria-label="Remove">&times;</button></td></tr>'}).join('')}
  function read(){rows=$$('tr',tb).map(function(tr){return $$('input,select',tr).map(function(c){return c.value})});store('dl_legacy',rows)}
  tb.addEventListener('input',read);tb.addEventListener('change',read);
  tb.addEventListener('click',function(e){var d=e.target.getAttribute('data-del');if(d!==null){read();rows.splice(+d,1);store('dl_legacy',rows);draw()}});
  $('#ladd',el).onclick=function(){read();rows.push(['','Other','Decide later','']);draw()};$('#lpr',el).onclick=function(){window.print()};draw();
};

/* ---------- Scam message checker ---------- */
var FLAGS=[
[/\b(urgent|immediately|right away|within 24 hours|act now|final notice|last warning|expires? (today|soon))\b/i,'Pressure to act fast. Real organisations give you time.',2],
[/\b(suspended|locked|disabled|unusual activity|unauthori[sz]ed|verify your (account|identity)|confirm your (details|account))\b/i,'Claims your account is locked or needs verifying.',2],
[/\b(gift ?cards?|bitcoin|crypto|wire transfer|western union|zelle|cash ?app|prepaid)\b/i,'Asks for payment by gift card, crypto, wire or payment app. These cannot be reversed.',3],
[/\b(password|passcode|pin|one[- ]time code|otp|verification code|social security|ssn|card number|cvv)\b/i,'Asks for a password, code or identity number. Legitimate senders never ask for these by message.',3],
[/\b(won|winner|prize|lottery|inheritance|refund is ready|claim your|free gift|congratulations)\b/i,'Promises a prize, refund or windfall you did not expect.',2],
[/\b(bit\.ly|tinyurl|t\.co|goo\.gl|is\.gd|rb\.gy|cutt\.ly|ow\.ly)\b/i,'Uses a link shortener that hides the real destination.',2],
[/https?:\/\/\d{1,3}(\.\d{1,3}){3}/i,'Links to a raw number address instead of a named website.',3],
[/https?:\/\/[^\s\/]*(-secure|-login|-verify|-support|-update|\.top|\.xyz|\.click|\.icu)\b/i,'Link uses a look-alike or throwaway web address.',2],
[/\b(dear (customer|user|member|client|friend)|valued customer)\b/i,'Generic greeting instead of your name.',1],
[/\b(do not (tell|share)|keep this (secret|confidential)|don\'?t tell)\b/i,'Asks you to keep it secret.',3],
[/\b(package|parcel|delivery).{0,40}(fee|held|failed|reschedul)/i,'Delivery problem with a fee or link: a very common text scam.',2],
[/\b(remote access|anydesk|teamviewer|install (this|the) app)\b/i,'Asks you to install remote-access software.',3],
[/\b(kindly|do the needful|revert back)\b/i,'Phrasing commonly seen in scripted scam messages.',1]
];
T.scam=function(el){
  el.innerHTML='<label>Paste the suspicious text, email or chat message<textarea id="scm" rows="7" placeholder="Paste the message here. It is analysed in your browser and never sent anywhere."></textarea></label><p><button class="btn" type="button" id="scb">Check for red flags</button></p><div id="sco"></div>';
  $('#scb',el).onclick=function(){var t=$('#scm',el).value,o=$('#sco',el);if(!t.trim()){o.innerHTML='<p class="mut">Paste a message first.</p>';return}
    var hit=FLAGS.filter(function(f){return f[0].test(t)}),w=hit.reduce(function(s,f){return s+f[2]},0),v=w>=6?['High risk','var(--bad)']:w>=3?['Suspicious','var(--warn)']:w>0?['Some caution','var(--warn)']:['No common red flags found','var(--acc)'];
    o.innerHTML='<div class="card"><h3 style="color:'+v[1]+'">'+v[0]+'</h3>'+hit.map(function(f){return'<div class="flag">'+f[1]+'</div>'}).join('')+'<p class="sm mut" style="margin-top:.8rem">'+(hit.length?'Do not reply, tap links or call numbers in the message. Contact the organisation through its official app or a number you look up yourself.':'This check only looks for well-known patterns and cannot prove a message is safe. If it asks for money, codes or personal details, verify through an official channel first.')+'</p></div>'};
};

$$('[data-tool]').forEach(function(el){var t=T[el.getAttribute('data-tool')];if(t)try{t(el)}catch(e){el.innerHTML='<p class="msg err">This tool could not start in your browser.</p>'}});
})();
