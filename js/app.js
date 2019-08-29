var positions = document.getElementsByClassName("baby");
var select1 = document.getElementById("select1");
var select2 = document.getElementById("select2");
var character1 = document.getElementById("character1");
var character2 = document.getElementById("character2");
var start = document.getElementById("start");
var reset = document.getElementById("reset");
var counter = 0;
var player1 = "";
var player2 = "";
var messages = document.getElementById("msg");
var random = (Math.random()>0.5).toString();
var player1wins=0;
var player2wins=0;
var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
var resco = document.getElementById("resco");

createCharacterList();

var jugador1 = "";
var jugador2 = "";

resco.addEventListener("click", resetScore);
select1.addEventListener("click", submit1);
select2.addEventListener("click", submit2);
start.addEventListener("click",startgame);
reset.addEventListener("click",reset0);

messages.textContent = "Select Your character and Press Selected";



function startgame(){
  console.log(player1,player2);
  for(var i=0;i<positions.length;i++){
     positions[i].addEventListener('click',turn);
    }
    if(random == "true"){
       jugador1=player1;
       jugador2=player2;
       messages.textContent = jugador2 +" Turn";
    }else{
      jugador1=player2;
      jugador2=player1;
      messages.textContent = jugador2 +" Turn";
    }

}

function createCharacterList(){
  character1.innerHTML =""; //erase options
  character2.innerHTML =""; // erase options
  character1.add(getOption("Choose your Character", ""));
  character1.add(getOption("Robot Malo", "RobotMalo"));
  character1.add(getOption("Gir", "Gir"));
  character1.add(getOption("Cthulhu", "Cthulhu"));
  character1.add(getOption("Bunny", "Bunny"));
  character2.add(getOption("Choose your Character", ""));
  character2.add(getOption("Robot Malo", "RobotMalo"));
  character2.add(getOption("Gir", "Gir"));
  character2.add(getOption("Cthulhu", "Cthulhu"));
  character2.add(getOption("Bunny", "Bunny"));


}
function getOption(text, value){
  var option = document.createElement("option");
  option.text = text;
  option.value=value;
  return option;
}



function turn() {

  if (counter % 2) {
    if (event.srcElement.children.length === 0) {
      messages.textContent = jugador2 +" Turn";
      var cardElement = document.createElement('img');
      cardElement.setAttribute('height', "150px");
      cardElement.setAttribute('width', "150px");
      cardElement.setAttribute('src', "img/" + jugador1 + ".gif");
      event.srcElement.appendChild(cardElement);
      counter++;
      event.srcElement.removeEventListener('click',turn);
      checkWin();
    }

  } else {
    if (event.srcElement.children.length === 0) {
      messages.textContent = jugador1 +" Turn";
      var cardElement = document.createElement('img');
      cardElement.setAttribute('height', "150px");
      cardElement.setAttribute('width', "150px");
      cardElement.setAttribute('src', "img/" + jugador2 + ".gif");
      event.srcElement.appendChild(cardElement);
      counter++;
      event.srcElement.removeEventListener('click',turn);
      checkWin();
      if(counter == 9){
        messages.textContent ="Please press reset";
        tie();
        counter=0;
      }
    }
  }

}

// selecting characters

function submit1(){
  player1 = character1.value;
  for(var i=0;i<character2.children.length;i++){
      if(player1 == character2.children[i].value &&  character2.children[i].value != ""){
        character2.remove([i]);
      }
    }
    if(!!player1 && !!player2){
      messages.textContent = "Press START";
    }
}

function submit2(){
  player2 = character2.value;
  for(var i=0;i<character1.children.length;i++){
      if(player2 == character1.children[i].value &&  character1.children[i].value != ""){
        character1.remove([i]);
      }
    }
    if(!!player1 && !!player2){
      messages.textContent = "Press START";
    }
}

//function to check for a win

function checkWin() {

  for (var l = 0; l <= 6; l += 3) {
    var winr=checkRow(l);
    if (winr) {
      messages.textContent = "Please press reset";
      canvas(winr);
      displayScore();
      removeListeners();
    }
  }

  for (var m = 0; m <= 2; m += 1) {
    var winc =checkColumn(m);
    if (winc) {
      messages.textContent = "Please press reset";
      canvas(winc);
      displayScore();
      removeListeners();
    }
  }

  var winD1 = checkDiagonal1(0);
  if (winD1) {
    messages.textContent = "Please press reset";
    canvas(winD1);
    displayScore();
    removeListeners();
  }

 var winD2 = checkDiagonal2(2);
  if (winD2) {
    messages.textContent = "Please press reset";
    canvas(winD2);
    displayScore();
    removeListeners();
  }

}

function removeListeners(){
  for(var i=0;i<positions.length;i++){
     positions[i].removeEventListener('click',turn);
    }
    counter=0;
    random = (Math.random()>0.5).toString();
}

function checkRow(start) {
  if (positions[start].getElementsByTagName("img").length > 0 &&
    positions[start + 1].getElementsByTagName("img").length > 0 &&
    positions[start + 2].getElementsByTagName("img").length > 0) {
    if (positions[start].getElementsByTagName("img")[0].src === positions[start + 1].getElementsByTagName("img")[0].src &&
      positions[start + 2].getElementsByTagName("img")[0].src === positions[start + 1].getElementsByTagName("img")[0].src) {
      if (positions[start].getElementsByTagName("img")[0].src.includes(player1)) {
        player1wins++;
        console.log(player1wins);
        return 1;
      } else {
        player2wins++;
        return 2;
      }
    }
    return 0;
  }
}

function checkColumn(start) {
  if (positions[start].getElementsByTagName("img").length > 0 &&
    positions[start + 3].getElementsByTagName("img").length > 0 &&
    positions[start + 6].getElementsByTagName("img").length > 0) {
    if (positions[start].getElementsByTagName("img")[0].src === positions[start + 3].getElementsByTagName("img")[0].src &&
      positions[start + 6].getElementsByTagName("img")[0].src === positions[start + 3].getElementsByTagName("img")[0].src) {
      if (positions[start].getElementsByTagName("img")[0].src.includes(player1)) {
        player1wins++;
        return 1;
      } else {
        player2wins++;
        return 2;
      }
    }
    return 0;
  }
}

function checkDiagonal1(start) {
  if (positions[start].getElementsByTagName("img").length > 0 &&
    positions[start + 4].getElementsByTagName("img").length > 0 &&
    positions[start + 8].getElementsByTagName("img").length > 0) {
    if (positions[start].getElementsByTagName("img")[0].src === positions[start + 4].getElementsByTagName("img")[0].src &&
      positions[start + 8].getElementsByTagName("img")[0].src === positions[start + 4].getElementsByTagName("img")[0].src) {
      if (positions[start].getElementsByTagName("img")[0].src.includes(player1)) {
        player1wins++;
        return 1;
      } else {
        player2wins++;
        return 2;
      }
    }
    return 0;
  }
}

function checkDiagonal2(start) {
  if (positions[start].getElementsByTagName("img").length > 0 &&
    positions[start + 2].getElementsByTagName("img").length > 0 &&
    positions[start + 4].getElementsByTagName("img").length > 0) {
    if (positions[start].getElementsByTagName("img")[0].src === positions[start + 2].getElementsByTagName("img")[0].src &&
      positions[start + 2].getElementsByTagName("img")[0].src === positions[start + 4].getElementsByTagName("img")[0].src) {
      if (positions[start].getElementsByTagName("img")[0].src.includes(player1)) {
        player1wins++;
        return 1;
      } else {
        player2wins++;
        return 2;
      }
    }
    return 0;
  }
}


function reset0(){
  for(var i=0; i<positions.length;i++){
    if(!!positions[i].children.length){
      positions[i].removeChild(positions[i].children[0]);
    }
  }
   player1 = "";
   player2 = "";
   character1.value = "";
   character2.value = "";
  createCharacterList();
  messages.textContent ="Select Your character and Press Selected";
  counter = 0;
  random = (Math.random()>0.5).toString();
  var lateral2 = document.getElementsByClassName("lateral2")[0];
  lateral2.removeChild(lateral2.children[1]);
}



// canvas
 function canvas(winner){

var lateral2 = document.getElementsByClassName("lateral2")[0];
var canvas = document.createElement('canvas');
lateral2.appendChild(canvas);



canvas.width = 300;
canvas.height = 480;

var ctx = canvas.getContext('2d');
var pieces = [];
var numberOfPieces = 50;
var lastUpdateTime = Date.now();

function randomColor () {
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function update () {
    var now = Date.now(),
        dt = now - lastUpdateTime;

    for (let i = pieces.length - 1; i >= 0; i--) {
        let p = pieces[i];

        if (p.y > canvas.height) {
            pieces.splice(i, 1);
            continue;
        }

        p.y += p.gravity * dt;
        p.rotation += p.rotationSpeed * dt;
    }


    while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, -20));
    }

    lastUpdateTime = now;

    setTimeout(update, 1);
}

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(function (p) {
        ctx.save();

        ctx.fillStyle = p.color;

        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);

        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();
    });

    requestAnimationFrame(draw);

    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "#24E8E8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("The winner is", canvas.width/2, canvas.height/4);
    ctx.fillText("Player "+ winner, canvas.width/2, canvas.height/2);

}

function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.size = (Math.random() * 0.5 + 0.75) * 15;
    this.gravity = (Math.random() * 0.5 + 0.75) * 0.1;
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * (Math.random() - 0.5) * 0.001;
    this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
    pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}


update();
draw();

}
 ////// this prints the tie image

function tie(){
  var lateral2 = document.getElementsByClassName("lateral2")[0];
  var imgTie = document.createElement('img');
  imgTie.setAttribute('src', "img/luck.gif");
  imgTie.setAttribute('height', "400px");
  imgTie.setAttribute('width', "350px");
  lateral2.appendChild(imgTie);
}

function resetScore(){
   player1wins = 0;
   player2wins = 0;
   displayScore();
}

function displayScore(){
  score1.textContent = player1wins;
  score2.textContent = player2wins;
}
