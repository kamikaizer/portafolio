const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordsIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
  const current = this.wordsIndex % this.words.length;
  const fullTxt = this.words[current];

if(this.isDeleting) {
  // borrar
  this.txt = fullTxt.substring(0, this.txt.length -1);
} else {
  // agregar
  this.txt = fullTxt.substring(0, this.txt.length +1);
}

this.txtElement.innerHTML = `<span class ="txt">${this.txt}</span>`;
// velocdad
let typeSpeed = 300;

if (this.isDeleting) {
  typeSpeed /= 2;
}

// cuando se completa la palabra

if(!this.isDeleting && this.txt === fullTxt) {

  // hacer una pausa al final
  typeSpeed = this.wait;
  this.isDeleting = true;
} else if(this.isDeleting && this.txt === '') {
  this.isDeleting = false;

  // escribe la siguiente palabra
  this.wordsIndex++;

  typeSpeed = 500;
}
  setTimeout(() => this.type(), 100)
}

document.addEventListener('DOMContentLoaded', init);

function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement, words, wait);
}
