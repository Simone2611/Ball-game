const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let partito = false;
const raggiob = 20;
const numero = 10;
const componenti = [
  {
    type: "rettangolo",
    x: 20,
    y: Math.floor(Math.random() * 200) + 130,
    speed: Math.floor(Math.random() * 7) + 3,
    larghezza: Math.floor(Math.random() * 170) + 90,
    colore: "orange",
  },
  {
    type: "rettangolo",
    x: 20,
    y: Math.floor(Math.random() * 130) + 20,
    speed: Math.floor(Math.random() * 7) + 3,
    larghezza: Math.floor(Math.random() * 170) + 90,
    colore: "orange",
  },
];

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  let ballx1 = event.clientX - rect.left;
  let bally1 = event.clientY - rect.top;

  let oggpalla = {
    type: "palla",
    x: ballx1,
    y: bally1,
    speedX: 2,
    speedY: -2,
    larghezza: Math.floor(Math.random() * 170) + 90,
    colore: "orange",
  };

  componenti.push(oggpalla);
});

function animazione(ballx1, bally1, index) {
  cerchio(ballx1, bally1);
  let y = +bally1 + +componenti[index].speedY;
  let x = +ballx1 + +componenti[index].speedX;

  if (y > canvas.height - raggiob || y < raggiob) {
    componenti[index].speedY = -componenti[index].speedY;
  }

  if (x > canvas.width - raggiob || x < raggiob) {
    componenti[index].speedX = -componenti[index].speedX;
  }

  componenti.forEach((element) => {
    debugger;
    let diff = element.y - element.larghezza;
    let diff2 = element.y - diff;
    if (element.type == "rettangolo") {
      debugger;
      if (
        x <= element.x + element.larghezza + raggiob &&
        x >= element.x &&
        y < element.y + 30 + raggiob &&
        y > element.y
      ) {
        componenti[index].speedX = -componenti[index].speedX;
        componenti[index].speedY = -componenti[index].speedY;
        componenti[index].colore = "white";
        console.log(componenti[index].colore);
      } else {
        componenti[index].colore = "orange";
      }
    }
  });

  componenti[index].x += componenti[index].speedX;
  componenti[index].y += componenti[index].speedY;
}

function cerchio(ballx, bally, index, colore) {
  ctx.beginPath();
  ctx.arc(ballx, bally, raggiob, 0, 2 * Math.PI);
  ctx.fillStyle = colore;
  ctx.fill();
}

function All() {
  componenti.forEach((element, index) => {
    if (element.type == "rettangolo") {
      debugger;
      rettangolo(
        element.x,
        element.y,
        index,
        element.larghezza,
        element.speed,
        element.colore
      );
      animazione2(
        element.x,
        element.y,
        index,
        element.larghezza,
        element.speed
      );
    }
    if (element.type == "palla") {
      cerchio(element.x, element.y, index, element.colore);
      animazione(element.x, element.y, index);
    }
  });
}

function rettangolo(rettx, retty, index, larghezza1, speed, colore) {
  debugger;
  ctx.beginPath();
  ctx.rect(rettx, retty, larghezza1, 30);
  ctx.fillStyle = colore;
  ctx.fill();
}

function animazione2(rettx, retty, index, larghezza, direzioneXrett) {
  let x2 = +rettx + +direzioneXrett;
  if (x2 > canvas.width - larghezza || x2 < 0) {
    componenti[index].speed = -direzioneXrett;
  }

  componenti[index].x += direzioneXrett;
}
function eliminaCosi() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  All();
}
setInterval(eliminaCosi, 10);
let random = Math.random() * 5;

// for (let i = 0; i < random; i++) {
//   randomostacoli();
// }
