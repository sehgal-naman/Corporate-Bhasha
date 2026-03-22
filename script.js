async function translateText(){

let input = document.getElementById("inputText").value;

let tone = document.getElementById("tone").value;

document.getElementById("status").innerText = "Thinking...";

try{

let response = await fetch("https://corporate-bhasha.onrender.com/translate"{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

text: input,
tone: tone

})

});

let data = await response.json();

document.getElementById("outputText").value = data.result;

document.getElementById("status").innerText = "Done ✔";

}catch(error){

document.getElementById("status").innerText = "Error";

console.log(error);

}

}



function copyText(){

let text = document.getElementById("outputText");

text.select();

document.execCommand("copy");

alert("Copied!");

}