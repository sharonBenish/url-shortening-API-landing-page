const mobileDropDownBtn = document.querySelector(".icon");
const dropdown = document.querySelector(".dropdown");
const input = document.querySelector("#shorten-link input");
const submit = document.querySelector("#shorten-link button");
const apiUrl = "https://api.shrtco.de/v2/shorten?url=";
const results = document.getElementById("results");

mobileDropDownBtn.addEventListener("click", ()=>{
    dropdown.classList.toggle("open");
})

submit.addEventListener("click", ()=>{
    console.log("clicked")
    shortenLink();

})

async function shortenLink(){
    const link = input.value;
    const res = await fetch(apiUrl + link);
    const json =await res.json();
    const result = json.result["full_short_link"];
    console.log(json.result["full_short_link"]);
    generateHTML(result);
    input.value="";
}

function generateHTML(result){
    const el = document.createElement("div");
    el.classList.add("result");
    el.innerHTML =` <div class="input-link">${input.value}</div>
    <div>
      <div class="shortened-link">${result}</div>
      <button class="btn">Copy</button></div>`
    
    results.appendChild(el);
}

results.addEventListener("click", (e)=>{
    if (e.target.tagName === "BUTTON"){
        copyToClipboard(e);
    }
})

function copyToClipboard(e){
    const copyBtn = e.target;
    const linkDiv = e.target.previousElementSibling;
    const link = linkDiv.textContent.trim();
    navigator.clipboard.writeText(link);
    copyBtn.textContent="Copied!";
    copyBtn.style.backgroundColor = "#3b3054";

    setTimeout(function () {
        copyBtn.textContent = "Copy";
        copyBtn.style.backgroundColor = "#2acfcf";
        }, 1000);
}


