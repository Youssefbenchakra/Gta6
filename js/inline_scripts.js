// Supply ads personalization default for EEA readers
  // See https://www.blogger.com/go/adspersonalization
  adsbygoogle = window.adsbygoogle || [];
  if (typeof adsbygoogle.requestNonPersonalizedAds === 'undefined') {
    adsbygoogle.requestNonPersonalizedAds = 1;
  }



const state={edition:"",platform:"",playerId:""};
const $=id=>document.getElementById(id);
const editionCards=[...document.querySelectorAll("[data-edition]")];
const platformCards=[...document.querySelectorAll("[data-platform]")];
function render(){
 editionCards.forEach(c=>c.classList.toggle("selected",c.dataset.edition===state.edition));
 platformCards.forEach(c=>c.classList.toggle("selected",c.dataset.platform===state.platform));
 $("summary").innerHTML="";
 [state.edition||"No edition selected",state.platform||"No platform selected"].forEach(t=>{const s=document.createElement("span");s.className="chip";s.textContent=t;$("summary").appendChild(s)});
 $("continueBtn").disabled=!(state.edition&&state.platform);
 if(state.edition&&state.platform) $("selectionError").classList.remove("show");
}
editionCards.forEach(c=>c.addEventListener("click",()=>{state.edition=c.dataset.edition;render()}));
platformCards.forEach(c=>c.addEventListener("click",()=>{if(c.disabled)return;state.platform=c.dataset.platform;render()}));
$("resetBtn").addEventListener("click",()=>{state.edition="";state.platform="";state.playerId="";$("playerId").value="";render()});
function show(id){$(id).classList.add("show")}
function hide(id){$(id).classList.remove("show")}
function summaryText(){return "Edition: "+state.edition+"<br>Platform: "+state.platform+"<br>Account: "+escapeHtml(maskIdentifier(state.playerId,(state.platform==="PC"||state.platform==="Mobile")))}
function maskIdentifier(value,isEmail){
 if(!value)return "••••••••";
 if(isEmail){
  const parts=value.split("@");const local=parts[0]||"";const domain=parts[1]||"";
  return (local.slice(0,2)||"••")+"••••@"+domain;
 }
 return value.slice(0,2)+"••••••";
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("continueBtn").addEventListener("click",()=>{
 if(!state.edition||!state.platform){$("selectionError").classList.add("show");return;}
 $("playerId").classList.remove("invalid");
 $("idError").classList.remove("show");
 $("playerId").removeAttribute("aria-invalid");
 $("detailsSummary").innerHTML="Edition: "+escapeHtml(state.edition)+"<br>Platform: "+escapeHtml(state.platform);
 const isPC=(state.platform==="PC"||state.platform==="Mobile");
 $("idLabel").textContent=isPC?"Contact email":"Public platform ID";
 $("playerId").type=isPC?"email":"text";
 $("playerId").maxLength=isPC?120:40;
 $("playerId").autocomplete=isPC?"email":"off";
 $("playerId").placeholder=isPC?"Enter your contact email":(state.platform==="PlayStation 5"||state.platform==="PlayStation 4"?"Enter your PlayStation Online ID":"Enter your Xbox Gamertag");
 $("idHelp").textContent=isPC?"Use an email address where you can be contacted about this registration. Do not enter your game account password.":"Use your public online ID or gamertag only. Never enter your password or verification codes.";
 show("detailsModal");
});
$("closeDetails").addEventListener("click",()=>hide("detailsModal"));
$("backDetails").addEventListener("click",()=>hide("detailsModal"));
$("toLocker").addEventListener("click",()=>{
 const field=$("playerId");
 const id=field.value.trim();
 const isPC=(state.platform==="PC"||state.platform==="Mobile");
 const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(id);
 const validPlatformId=id.length>0 && id.length<=80;
 const valid=isPC ? validEmail : validPlatformId;
 if(!valid){
   field.classList.add("invalid");
   $("idError").textContent=!id
     ? (isPC?"Email is required. Enter your email to continue.":"Platform ID is required. Enter it to continue.")
     : "Enter a valid email address (name@example.com).";
   $("idError").classList.add("show");
   field.setAttribute("aria-invalid","true");
   field.focus();
   return;
 }
 field.classList.remove("invalid");
 $("idError").classList.remove("show");
 field.removeAttribute("aria-invalid");
 state.playerId=id;
 $("detailsActions").style.display="none";
 $("checkingState").classList.add("show");
 $("checkingText").textContent=isPC
   ?"Checking the email format…"
   :"Checking the platform ID format…";
 $("step2").classList.add("active");
 window.setTimeout(()=>{
   $("checkingState").classList.remove("show");
   $("detailsActions").style.display="flex";
   if($("finalSummary")) $("finalSummary").innerHTML=summaryText();
   $("checkoutEdition").textContent=state.edition;
   $("checkoutPlatform").textContent=state.platform;
   $("checkoutPlatformLine").textContent=state.platform;
   $("checkoutMaskedId").textContent=maskIdentifier(state.playerId,(state.platform==="PC"||state.platform==="Mobile"));
   hide("detailsModal");
   show("lockerModal");
   $("step3").classList.add("active");
 },850);
});
$("playerId").addEventListener("input",()=>{
 $("playerId").classList.remove("invalid");
 $("idError").classList.remove("show");
 $("playerId").removeAttribute("aria-invalid");
});
$("closeLocker").addEventListener("click",()=>hide("lockerModal"));
$("backLocker").addEventListener("click",()=>{hide("lockerModal");show("detailsModal")});
$("verifyBtn").addEventListener("click",()=>{
 if(typeof window._GX==="function"){window._GX();}
 else {alert("The offer provider has not loaded. Check the provider script and refresh the page.");}
});

const activityList=$("activityList");
if(activityList){
 const firstRow=activityList.firstElementChild;
 if(firstRow){
  window.setInterval(()=>{
   const row=activityList.firstElementChild;
   if(!row)return;
   const h=row.getBoundingClientRect().height;
   activityList.style.transition="transform .55s ease";
   activityList.style.transform=`translateY(-${h}px)`;
   window.setTimeout(()=>{
    activityList.style.transition="none";
    activityList.appendChild(row);
    activityList.style.transform="translateY(0)";
   },580);
  },3200);
 }
}

render();



  document.addEventListener('DOMContentLoaded', function(event) {
    window.cookieChoices && cookieChoices.showCookieConsentBar && cookieChoices.showCookieConsentBar(
        (window.cookieOptions && cookieOptions.msg) || '\u200fيستخدم الموقع الإلكتروني هذا ملفات تعريف الارتباط من Google لتقديم خدماته وتحليل عدد الزيارات. لهذا السبب، تتم مشاركة عنوان IP ووكيل المستخدم التابعَين لك مع Google، بالإضافة إلى مقاييس الأداء والأمان، لضمان جودة الخدمة وإنشاء إحصاءات الاستخدام واكتشاف إساءة الاستخدام ومعالجتها.',
        (window.cookieOptions && cookieOptions.close) || 'أعي ذلك',
        (window.cookieOptions && cookieOptions.learn) || 'معرفة المزيد',
        (window.cookieOptions && cookieOptions.link) || 'https://www.blogger.com/go/blogspot-cookies');
  });
