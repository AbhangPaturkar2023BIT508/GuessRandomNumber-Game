function GuessRandomNumber() {
  let score = 0;
  let level = 1;
  let round = 1;
  let maxRange = 100;
  const maxAttempts = 10;
  let numberToGuess;
  let high_score = localStorage.getItem("high_score") || 0; // Initialize high_score variable from localStorage
  let attempts = maxAttempts; // Initialize attempts

  function updateUI() {
    document.getElementById("level").textContent = level;
    document.getElementById("round").textContent = round;
    document.getElementById("high_range").textContent = maxRange;
    document.getElementById("attempt").textContent = attempts;
    document.getElementById("curr_score").textContent = score;
    document.getElementById("high_score").textContent = high_score;
    document.querySelector(".btn_check_guess").disabled = false;
    document.getElementById("userGuess").value = "";
    // document.getElementById("num_info").textContent = "";
  }

  function generateNumberToGuess() {
    numberToGuess = Math.floor(Math.random() * maxRange) + 1;
  }

  generateNumberToGuess();

  updateUI(); // Initial UI update

  function checkGuess() {
    const userGuess = parseInt(document.getElementById("userGuess").value);

    if (userGuess === numberToGuess) {
      score++;
      document.getElementById("num_info").textContent =
        "Congratulations! You've guessed the correct number.";
      document.getElementById("userGuess").value = ""; // Clear input field
      document.querySelector(".btn_check_guess").disabled = true; // Disable check button

      // Reset button and input field after a short delay
      setTimeout(() => {
        document.querySelector(".btn_check_guess").disabled = false;
        document.getElementById("num_info").textContent = ""; // Reset num_info
      }, 1000);

      // Update high_score if the current score is higher
      if (score > high_score) {
        high_score = score;
        localStorage.setItem("high_score", high_score); // Store high_score in localStorage
      }

      if (level % 5 === 0) {
        // If it's the last level of the round
        round++;
        maxRange += 100; // Increase maxRange for next round
      }

      if (level === 5) {
        // Reset level to 1 after 5 levels
        level = 1;
      } else {
        level++; // Increment level if not the last level of the round
      }

      attempts = maxAttempts;
      generateNumberToGuess();
    } else if (userGuess < numberToGuess) {
      document.getElementById(
        "num_info"
      ).textContent = `Your guess is too low.${numberToGuess}`;
      attempts--; // Decrease attempts if user guess is incorrect
    } else {
      document.getElementById("num_info").textContent =
        "Your guess is too high.";
      attempts--; // Decrease attempts if user guess is incorrect
    }

    // Check if attempts are exhausted
    if (attempts === 0) {
      document.getElementById(
        "num_info"
      ).textContent = `Sorry, you've reached the maximum number of attempts. The correct number was: ${numberToGuess}`;
      setTimeout(() => {
        document.querySelector(".btn_check_guess").disabled = false;
        document.getElementById("userGuess").value = "";
        document.getElementById("num_info").textContent = "";
      }, 1000);

      level = 1;
      round = 1;
      attempts = maxAttempts;
      generateNumberToGuess();
    }

    updateUI();
  }

  document
    .querySelector(".btn_play_again")
    .addEventListener("click", function () {
      level = 1;
      round = 1;
      score = 0;
      attempts = maxAttempts;
      generateNumberToGuess();
      updateUI();
    });

  document
    .querySelector(".btn_check_guess")
    .addEventListener("click", checkGuess);
}

GuessRandomNumber();
