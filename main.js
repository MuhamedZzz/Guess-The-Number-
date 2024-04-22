let randomNumber;
let count = 0;
let tries = 0;
let isCorrectGuess = false;
let difficulty = "easy";

const value = document.querySelector("#value");
const btns = document.querySelectorAll(
  ".btn-decrease, .btn-submit, .btn-increase"
);
const messageContainer = document.getElementById("message-container");
const difficultyCards = document.querySelectorAll(".difficulty-card");
const submitButton = document.querySelector(".btn-submit");
const numberContainer = document.getElementById("number-container");
const clearButton = document.createElement("div");

function initializeGame() {
  setRandomNumber();
  resetGame();
}

function setRandomNumber() {
  switch (difficulty) {
    case "easy":
      randomNumber = Math.floor(Math.random() * 11);
      break;
    case "medium":
      randomNumber = Math.floor(Math.random() * 101);
      break;
    case "hard":
      randomNumber = Math.floor(Math.random() * 201) - 100;
      break;
    default:
      randomNumber = Math.floor(Math.random() * 101);
  }
}

difficultyCards.forEach((card) => {
  card.addEventListener("click", function () {
    difficultyCards.forEach((c) => c.classList.remove("selected"));
    this.classList.add("selected");
    difficulty = this.id;
    initializeGame();

    document.body.classList.remove("easy", "medium", "hard");
    switch (difficulty) {
      case "easy":
        document.body.classList.add("easy");
        break;
      case "medium":
        document.body.classList.add("medium");
        break;
      case "hard":
        document.body.classList.add("hard");
        break;
      default:
        break;
    }
  });
});

numberContainer.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("number-card")) {
    const number = target.textContent;
    if (!isCorrectGuess) {
      updateValue(number);
    }
  }
});

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    if (isCorrectGuess) {
      resetGame();
      return;
    }

    const styles = e.currentTarget.classList;

    if (styles.contains("btn-decrease")) {
      count = Math.max(count - 1, difficulty === "hard" ? -100 : 0);
    } else if (styles.contains("btn-increase")) {
      switch (difficulty) {
        case "easy":
          count = Math.min(count + 1, 10);
          break;
        case "medium":
          count = Math.min(count + 1, 100);
          break;
        case "hard":
          count = Math.min(count + 1, 100);
          break;
        default:
          count = Math.min(count + 1, 100);
      }
    } else if (styles.contains("btn-submit")) {
      submitGuess();
    }

    value.textContent = count;
  });
});

clearButton.textContent = "Clear";
clearButton.classList.add("number-card");
clearButton.addEventListener("click", function () {
  if (!isCorrectGuess) {
    count = 0;
    value.textContent = count;
  }
});

numberContainer.appendChild(clearButton);

function updateValue(number) {
  count = parseInt(`${count}${number}`);
  if (difficulty === "hard") {
    count = Math.min(Math.max(count, -100), 100);
  } else if (difficulty === "medium") {
    count = Math.min(Math.max(count, 0), 100);
  } else {
    count = Math.min(Math.max(count, 0), 10);
  }
  value.textContent = count;
}

clearButton.classList.add("number-card", "clear");

function submitGuess() {
  if (isCorrectGuess) {
    resetGame();
    return;
  }

  tries++;
  if (count === randomNumber) {
    isCorrectGuess = true;
    messageContainer.textContent = `Congratulations! You guessed the number ${randomNumber} in ${tries} tries.`;
    messageContainer.style.color = "green";
    value.style.color = "green";
  } else if (count < randomNumber) {
    messageContainer.textContent = "Higher";
    messageContainer.style.color = "red";
    flashRed();
  } else if (count > randomNumber) {
    messageContainer.textContent = "Lower";
    messageContainer.style.color = "red";
    flashRed();
  }
}

function resetGame() {
  setRandomNumber();
  count = 0;
  tries = 0;
  isCorrectGuess = false;
  value.textContent = count;
  messageContainer.textContent = "";
  value.style.color = "black";
}

function flashRed() {
  const flashDuration = 100;
  const numFlashes = 5;

  for (let i = 0; i < numFlashes; i++) {
    setTimeout(function () {
      value.style.color = "red";
    }, i * flashDuration);
    setTimeout(function () {
      value.style.color = "black";
    }, (i + 0.5) * flashDuration);
  }
}

initializeGame();
