const translations = {en:{},si:{},ja:{}};
function applyLanguage(lang){
  document.documentElement.lang = lang === "ja" ? "ja" : lang;
  document.querySelectorAll("[data-"+lang+"]").forEach(el=>{
    const value = el.getAttribute("data-"+lang);
    if(value) el.textContent = value;
  });
  // Restore English labels when English is selected.
  if(lang==="en") document.querySelectorAll("[data-en]").forEach(el=>{if(el.getAttribute("data-en"))el.textContent=el.getAttribute("data-en");});
  try{localStorage.setItem("travelBlogLanguage",lang)}catch(e){}
}
document.addEventListener("DOMContentLoaded",()=>{
 const selector=document.getElementById("language");
 let saved="en"; try{saved=localStorage.getItem("travelBlogLanguage")||"en"}catch(e){}
 if(selector){selector.value=saved;selector.addEventListener("change",()=>applyLanguage(selector.value));}
 if(saved!=="en") applyLanguage(saved);
 const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
 const search=document.getElementById("destinationSearch");
 if(search) search.addEventListener("input",()=>{
   const query=search.value.toLowerCase(); let shown=0;
   document.querySelectorAll("#destinationCards .travel-card").forEach(card=>{
    const match=(card.dataset.search||card.textContent).toLowerCase().includes(query);
    card.style.display=match?"":"none"; if(match)shown++;
   });
   const noResults=document.getElementById("noResults"); if(noResults)noResults.classList.toggle("hidden",shown>0);
 });
});
function translateCurrentPage(){
 const selector=document.getElementById("language");
 const lang=selector?selector.value:"si";
 const url="https://translate.google.com/translate?sl=auto&tl="+encodeURIComponent(lang)+"&u="+encodeURIComponent(location.href);
 window.open(url,"_blank","noopener");
}
function contactDemo(event){
 event.preventDefault();
 const form=event.target;
 const name=form.elements.name.value.trim(), email=form.elements.email.value.trim(), message=form.elements.message.value.trim();
 const subject=encodeURIComponent("Travel blog enquiry from "+name);
 const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message);
 // Replace this placeholder with the site owner's email before publishing.
 window.location.href="mailto:YOUR_EMAIL@example.com?subject="+subject+"&body="+body;
 document.getElementById("formNote").textContent="Your email app should open. Replace YOUR_EMAIL@example.com in assets/script.js with your actual email address.";
 return false;
}