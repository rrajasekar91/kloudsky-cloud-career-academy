
const btn=document.querySelector('.mobile-btn');
const links=document.querySelector('.nav-links');
if(btn){btn.addEventListener('click',()=>links.classList.toggle('open'));}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

async function submitToAppsScript(form, endpoint, type){
  const success=form.querySelector('.success'); const error=form.querySelector('.error');
  success?.classList.remove('show'); error?.classList.remove('show');
  const data=Object.fromEntries(new FormData(form).entries()); data.type=type; data.submittedAt=new Date().toISOString();
  if(!endpoint || endpoint.includes('PASTE_YOUR')){
    error.textContent='The form is ready, but the Google Sheets endpoint has not been configured yet. Add your Apps Script Web App URL in assets/js/config.js.';
    error.classList.add('show'); return;
  }
  try{
    await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    form.reset(); success?.classList.add('show');
  }catch(e){ error.textContent='We could not submit the form right now. Please try again or contact KloudSky directly.'; error.classList.add('show'); }
}

window.submitKloudSkyForm=(form,type)=>submitToAppsScript(form,window.KLOUDSKY_APPS_SCRIPT_URL,type);
