import"./modulepreload-polyfill-9p4a8sJU.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("clickButton"),o=document.getElementById("totalClicks");e.addEventListener("click",()=>{fetch("/server/clicks.json",{method:"POST"}).then(t=>{if(!t.ok)throw new Error("Failed to send click data to server");return t.json()}).then(t=>{console.log("Click data received:",t),t&&typeof t.totalClicks<"u"?o.textContent=t.totalClicks:console.error("Invalid or missing totalClicks data")}).catch(t=>{console.error("Error:",t)})})});
