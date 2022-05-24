var nomRegion = [
	"Niamey",
	"Tillabery",
	"Dosso",
	"Maradi",
	"Zinder",
	"Diffa",
	"Tahoua",
	"Agadez",
	"Arlit",
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
// fonction pour les mots aléatoire
function randomWord() {
  answer = nomRegion[Math.floor(Math.random() * nomRegion.length)];
}
 
// faire apparaitre les buttons de lettres pour pouvoir les generer
function generateButtons() {
    let lettre = 'abcdefghijklmnopqrstuvwxyz'
    let buttonsHTML = lettre.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          `+ letter +`
        </button>
      `).join('-');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }

//   function pour choisir les lettre
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    // document.getElementById(chosenLetter).setAttribute('disabled', true);
    // alert(answer);
   if(answer.indexOf(chosenLetter) >= 0){
    guessedWord();
    checkIfGameWon()  
   } else if (answer.indexOf(chosenLetter) === -1){
       mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
   }
  }

  //   function pour mettre les photos
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

//   mise à jour des mistakes
  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }


//   function pour message une fois gagné
  function checkIfGameWon(){
      if (wordStatus === answer){
         document.getElementById('keyboard').innerHTML = 'you win!!!'; 
      }
  }

//   function pour message une fois perdu

  function checkIfGameLost(){
    if (mistakes === maxWrong){
        document.getElementById('wordSpotlight').innerHTML = ' la reponse est : ' + answer;
       document.getElementById('keyboard').innerHTML = 'you lose!!!'; 
    }
}

// function pour reset de function
function reset(){
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    randomWord();
    generateButtons();
    guessedWord();
    updateMistakes();
}




//   funtion qui fait apparaitre les lettres saisie

  function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " . ")).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }

  
  document.getElementById('maxWrong').innerHTML = maxWrong;

  randomWord();
  generateButtons();
  guessedWord();

  