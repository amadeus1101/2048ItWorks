var cardsArray = [];

for (let i = 0; i < 16; i++) {
  cardsArray[i] = "";
}

var keyName;

/**                         simple functions                 */

function firstGeneration() {
  let randIndex1 = Math.floor(Math.random() * 15);
  let randIndex2 = Math.floor(Math.random() * 15);
  if (randIndex1 == randIndex2) {
    if (randIndex1 < 14) {
      randIndex1++;
    } else {
      randIndex1--;
    }
  }
  cardsArray[randIndex1] = 2;
  cardsArray[randIndex2] = 2;

  generateCardsValues();
}

function generateCardsValues() {
  var game = document.getElementById("gameField");
  for (let i = 0; i < 16; i++) {
    game.insertAdjacentHTML(
      "beforeend",
      `<div class="number" id="` + i + `">` + cardsArray[i] + `</div>`
    );
  }
  for (let i = 0; i < 16; i++) {
    if (cardsArray[i] != "") {
      document.getElementById(i).style.background = "blue";
    }
  }
}

function updateBackgroundState() {
  for (let i = 0; i < cardsArray.length; i++) {
    document.getElementById(i).innerHTML = cardsArray[i];
    if (cardsArray[i] == "") {
      document.getElementById(i).style.background = "transparent";
    } else {
      document.getElementById(i).style.background = "blue";
    }
  }
  for (let i = 0; i < cardsArray.length; i++) {
    switch (cardsArray[i]) {
      case 4:
        document.getElementById(i).style.background = "rgb(255, 89, 89)";
        break;
      case 8:
        document.getElementById(i).style.background = "rgb(230, 139, 21)";
        break;
      case 16:
        document.getElementById(i).style.background = "rgb(180, 177, 0)";
        break;
      case 32:
        document.getElementById(i).style.background = "rgb(102, 180, 0)";
        break;
      case 64:
        document.getElementById(i).style.background = "rgb(0, 180, 81)";
        break;
      case 128:
        document.getElementById(i).style.background = "rgb(0, 180, 180)";
        break;
      case 256:
        document.getElementById(i).style.background = "rgb(0, 78, 180)";
        break;
      case 512:
        document.getElementById(i).style.background = "rgb(123, 0, 180)";
        break;
      case 1024:
        document.getElementById(i).style.background = "rgb(180, 0, 165)";
        break;
      case 2048:
        document.getElementById(i).style.background = "rgb(180, 0, 24)";
        break;
      case 4096:
        document.getElementById(i).style.background = "rgb(67, 0, 122";
        break;
    }
  }
}

function generateNewNumber() {
  let emptyIdArray = [];
  let randomEmptyIndex;
  let i = 0;
  for (k = 0; k < cardsArray.length; k++) {
    if (cardsArray[k] == "") {
      emptyIdArray[i] = k;
      i++;
    }
  }

  randomEmptyIndex = Math.floor(Math.random() * emptyIdArray.length);

  cardsArray[randomEmptyIndex] = 2;

  updateBackgroundState();
}

/**                            movement functions                   */

function xCheckSimilar(xdirect) {
  for (let stringNumber = 0; stringNumber < 4; stringNumber++) {
    for (let i = 0; i < 3; i++) {
      let xFirstSimilarElement = stringNumber * 4 + i;
      let xSecondSimilarElement = xFirstSimilarElement + 1;
      if (cardsArray[stringNumber * 4 + i] != "") {
        if (
          (stringNumber == 0 && xSecondSimilarElement < 4) ||
          (stringNumber == 1 && xSecondSimilarElement < 8) ||
          (stringNumber == 2 && xSecondSimilarElement < 12) ||
          (stringNumber == 3 && xSecondSimilarElement < 16)
        ) {
          if (
            cardsArray[xFirstSimilarElement] ==
            cardsArray[xSecondSimilarElement]
          ) {
            /* left*/
            if (xdirect == 0) {
              cardsArray[xFirstSimilarElement] =
                cardsArray[xFirstSimilarElement] * 2;
              cardsArray[xSecondSimilarElement] = "";

              console.log("done left");
            }

            /* right */
            if (xdirect == 1) {
              cardsArray[xSecondSimilarElement] =
                cardsArray[xSecondSimilarElement] * 2;
              cardsArray[xFirstSimilarElement] = "";

              console.log("done right");
            }
          }
        }
      }
    }
  }
}

function yCheckSimilar(ydirect) {
  for (let stringNumber = 0; stringNumber < 4; stringNumber++) {
    for (let i = 0; i < 3; i++) {
      let yFirstSimilarElement = stringNumber + i * 4;
      let ySecondSimilarElement = yFirstSimilarElement + 4;
      if (cardsArray[stringNumber + i * 4] != "") {
        if (
          cardsArray[yFirstSimilarElement] == cardsArray[ySecondSimilarElement]
        ) {
          /* up*/
          if (ydirect == 0) {
            cardsArray[yFirstSimilarElement] =
              cardsArray[yFirstSimilarElement] * 2;
            cardsArray[ySecondSimilarElement] = "";
            console.log("up done");
          }

          /* down */
          if (ydirect == 1) {
            cardsArray[ySecondSimilarElement] =
              cardsArray[ySecondSimilarElement] * 2;
            cardsArray[yFirstSimilarElement] = "";
            console.log("down done");
          }
        }
      }
    }
  }
}

function swipeLeft() {
  for (let i = 0; i < 4; i++) {
    let tempVar = "";
    let emptyCounter = 0;
    for (let k = 0; k < 4; k++) {
      let currentArrIndex = i * 4 + k;
      if (cardsArray[currentArrIndex] != "") {
        tempVar = cardsArray[currentArrIndex];
        cardsArray[currentArrIndex] = "";

        cardsArray[currentArrIndex - emptyCounter] = tempVar;
      } else {
        emptyCounter++;
      }
      if (emptyCounter == 4) {
        emptyCounter = 0;
      }
    }
  }
  xCheckSimilar(0);
  generateNewNumber();
}

function swipeRight() {
  for (let i = 0; i < 4; i++) {
    let tempVar = "";
    let emptyCounter = 0;
    for (let k = 3; k >= 0; k--) {
      let currentArrIndex = i * 4 + k;
      if (cardsArray[currentArrIndex] != "") {
        tempVar = cardsArray[currentArrIndex];
        cardsArray[currentArrIndex] = "";

        cardsArray[currentArrIndex + emptyCounter] = tempVar;
      } else {
        emptyCounter++;
      }
      if (emptyCounter == 4) {
        emptyCounter = 0;
      }
    }
  }
  xCheckSimilar(1);
  generateNewNumber();
}

function swipeUp() {
  for (let i = 0; i < 4; i++) {
    let tempVar = "";
    let emptyCounter = 0;

    for (let k = 0; k < 4; k++) {
      let currentArrIndex = i + k * 4;
      if (cardsArray[currentArrIndex] != "") {
        tempVar = cardsArray[currentArrIndex];
        cardsArray[currentArrIndex] = "";

        cardsArray[currentArrIndex - emptyCounter * 4] = tempVar;
      } else {
        emptyCounter++;
      }
      if (emptyCounter == 4) {
        emptyCounter = 0;
      }
    }
  }
  yCheckSimilar(0);
  generateNewNumber();
}

function swipeDown() {
  for (let i = 0; i < 4; i++) {
    let tempVar = "";
    let emptyCounter = 0;

    for (let k = 3; k >= 0; k--) {
      let currentArrIndex = i + k * 4;
      if (cardsArray[currentArrIndex] != "") {
        tempVar = cardsArray[currentArrIndex];
        cardsArray[currentArrIndex] = "";

        cardsArray[currentArrIndex + emptyCounter * 4] = tempVar;
      } else {
        emptyCounter++;
      }
      if (emptyCounter == 4) {
        emptyCounter = 0;
      }
    }
  }
  yCheckSimilar(1);
  generateNewNumber();
}

document.addEventListener("keyup", function (event) {
  keyName = event.key;
  if (keyName == "ArrowLeft") {
    swipeLeft();
  }
  if (keyName == "ArrowRight") {
    swipeRight();
  }
  if (keyName == "ArrowUp") {
    swipeUp();
  }
  if (keyName == "ArrowDown") {
    swipeDown();
  }
});
// document.addEventListener("keyup", updateState());
