window.onload = function(){
  var poem = require("./index.js");
  var secureRandom = require("secure-random");
  function randomWords(count, bits){
    var words = [];
    for (var i=0; i<count; ++i){
      var w = secureRandom.randomArray(4);
      var r = (w[0]*0x10000 + w[1]*0x100 + w[2]) % Math.pow(2,bits);
      words.push(r);
    };
    return words;
  };

  // This code is quite messy, never mind it

  var main = document.getElementById("main");

  var text = document.createElement("textarea");
  text.cols = 100;
  text.rows = 400;

  var genRandomButton = document.createElement("button");
  genRandomButton.innerHTML = "Generate Random Key";
  genRandomButton.onclick = function(){
    loadWords(randomWords(9, 9));
  };

  var loadWordsButton = document.createElement("button");
  loadWordsButton.innerHTML = "Load Key";
  loadWordsButton.onclick = function(){
    try {
      var key = prompt("key:");
      if (!key) throw "";
      key = key.split(" ");
      if (key.length !== 9) throw "";
      key = key.map(function(n){ return parseInt(n, 16); });
      loadWords(key);
    } catch (e) {
      alert("Wrong key");
    }
  };

  var loadRhymButton = document.createElement("button");
  loadRhymButton.innerHTML = "Load Poem";
  loadRhymButton.onclick = function(){
    try {
      var rhyme = prompt("poem:");
      var words = poem.toWords(rhyme);
      if (words.indexOf(-1) !== -1) throw "";
      loadWords(words);
    } catch (e) {
      alert("Wrong poem");
    }
  };

  var buttonsDiv = document.createElement("div");
  buttonsDiv.appendChild(genRandomButton);
  buttonsDiv.appendChild(loadWordsButton);
  buttonsDiv.appendChild(loadRhymButton);

  main.appendChild(buttonsDiv);
  main.appendChild(text);

  function loadWords(key){
    text.innerHTML
      = "Key: "+key.map(function(n){return n.toString(16).toUpperCase()}).join(" ")+"\n"
      + poem.fromWords(key)+"\n"
      + "\n"
      + text.innerHTML;
  };
};
