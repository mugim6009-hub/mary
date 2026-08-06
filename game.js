let userScore = 0;
let computerScore = 0;
const winScore = 5;

const userScoreSpan = document.getElementById('userScore');
const computerScoreSpan = document.getElementById('computerScore');
const resultDiv = document.getElementById('result');
const userChoiceSpan = document.getElementById('userChoice');
const computerChoiceSpan = document.getElementById('computerChoice');
const choiceButtons = document.querySelectorAll('.choice');

// Computer randomly picks
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
}

// Convert to emoji for display
function toEmoji(choice) {
  if (choice === 'rock') return '✊ Rock';
  if (choice === 'paper') return '✋ Paper';
  return '✌️ Scissors';
}

// Main game function
function playGame(userChoice) {
  if (userScore === winScore || computerScore === winScore) return;

  const computerChoice = getComputerChoice();

  userChoiceSpan.textContent = toEmoji(userChoice);
  computerChoiceSpan.textContent = toEmoji(computerChoice);

  // Decide who wins
  if (userChoice === computerChoice) {
    resultDiv.textContent = "It's a Draw! 🤝";
    resultDiv.style.color = '#f39c12';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    userScoreSpan.textContent = userScore;
    resultDiv.textContent = `You Win This Round! 🎉`;
    resultDiv.style.color = '#2ecc71';
  } else {
    computerScore++;
    computerScoreSpan.textContent = computerScore;
    resultDiv.textContent = `Computer Wins This Round! 😢`;
    resultDiv.style.color = '#e74c3c';
  }

  checkWinner();
}

// Check if someone reached 5 wins
function checkWinner() {
  if (userScore === winScore) {
    resultDiv.textContent = "🏆 YOU WON THE GAME! 🏆";
    disableButtons();
  } else if (computerScore === winScore) {
    resultDiv.textContent = "💻 COMPUTER WON THE GAME! 💻";
    disableButtons();
  }
}

function disableButtons() {
  choiceButtons.forEach(btn => btn.style.opacity = '0.5');
}

// Reset function
function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;
  resultDiv.textContent = "Make your move";
  resultDiv.style.color = '#764ba2';
  userChoiceSpan.textContent = '-';
  computerChoiceSpan.textContent = '-';
  choiceButtons.forEach(btn => btn.style.opacity = '1');
}

// Add click event to buttons
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    playGame(button.dataset.choice);
  });
});

// Keyboard support: R = Rock, P = Paper, S = Scissors
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'r') playGame('rock');
  if (key === 'p') playGame('paper');
  if (key === 's') playGame('scissors');
  if (key === 'escape') resetGame();
});