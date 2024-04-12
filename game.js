const WhoWon = Object.freeze({
  PLAYER: "Player", COMPUTER: "Computer", NOBODY: "Nobody",
});

class WinResult {
  constructor(message, whoWon) {
    this.message = message;
    this.whoWon = whoWon;
  }
}

function getComputerChoice() {
  // Get a number between 0 and 2 inclusive
  const randNum = Math.floor(Math.random() * 3);

  switch (randNum) {
    // If the number is 0 then return 'Rock'
    case 0:
      return 'Rock';
    // If the number is 1 then return 'Paper'
    case 1:
      return 'Paper';
    // If the number is 2 then return 'Scissors'
    case 2:
      return 'Scissors';
    // Otherwise log an error for an unknown value:
    default:
      console.error(`Bad random number generated: ${randNum}`);
  }
}

function playerRockVsComputer(computerSelection) {
  // Player selected rock. See what the computer chose, and return an appropriate string.
  switch (computerSelection) {
    // If computer chose rock, then it's a draw
    case 'rock':
      return new WinResult("It's a draw.", WhoWon.NOBODY);
    // If computer chose paper, then the computer won
    case 'paper':
      return new WinResult('You lose! Paper beats Rock', WhoWon.COMPUTER);
    // If computer chose scissors, then the player won
    case 'scissors':
      return new WinResult("You won! Rock beats Scissors", WhoWon.PLAYER);
    // Otherwise, log an error for an unknown computer selection
    default:
      console.error(`Unknown computer selection ${computerSelection}`)
  }
}

function playerPaperVsComputer(computerSelection) {
  // Player selected paper. See what the computer chose, and return an appropriate string.
  switch (computerSelection) {
    // If computer chose rock, then the player won
    case 'rock':
      return new WinResult("You won! Paper beats Rock", WhoWon.PLAYER);
    // If computer chose paper, then it's a draw
    case 'paper':
      return new WinResult("It's a draw.", WhoWon.NOBODY);
    // If computer chose scissors, then the computer won
    case 'scissors':
      return new WinResult("You lost! Scissors beats Paper", WhoWon.COMPUTER);
    // Otherwise, log an error for an unknown computer selection
    default:
      console.error(`Unknown computer selection ${computerSelection}`)
  }
}

function playerScissorsVsComputer(computerSelection) {
  // Player selected scissors. See what the computer chose, and return an appropriate string.
  switch (computerSelection) {
    // If computer chose rock, then the computer won
    case 'rock':
      return new WinResult("You lost! Rock beats Scissors", WhoWon.COMPUTER);
    // If computer chose paper, then the player won
    case 'paper':
      return new WinResult("You won! Scissors beats Paper", WhoWon.PLAYER);
    // If computer chose scissors, then it's a draw
    case 'scissors':
      return new WinResult("It's a draw", WhoWon.NOBODY);
    // Otherwise, log an error for an unknown computer selection
    default:
      console.error(`Unknown computer selection ${computerSelection}`)
  }
}

function playRound(playerSelection, computerSelection) {
  // Make playerSelection and computerSelection lower case so that we can do case-insensitive comparisons between them
  playerSelection = playerSelection.toLowerCase()
  computerSelection = computerSelection.toLowerCase()

  // Select logic based on what the player and the computer chose.
  switch (playerSelection) {
    // Handle cases where player chose rock
    case 'rock':
      return playerRockVsComputer(computerSelection);
    // Handle cases where player chose paper
    case 'paper':
      return playerPaperVsComputer(computerSelection);
    // Handle cases where player chose scissors
    case 'scissors':
      return playerScissorsVsComputer(computerSelection);
    // Otherwise, log an error for an unknown computer selection
    default:
      console.error(`Unknown player selection ${playerSelection}`);
  }
}

function isRockPaperOrScissors(userChoice) {
  if (typeof userChoice !== 'string') {
    throw new TypeError('Expected a string as input');
  }
  const normalizedChoice = userChoice.toLowerCase();
  return ['rock', 'paper', 'scissors'].includes(normalizedChoice);
}

function getPlayerChoice() {
  let busyLooping = true;
  let userChoice;
  do {
    // Ask player to input rock, paper, or scissors
    userChoice = prompt("Rock, Paper, or Scissors?")

    // If they didn't input one of those, then warn them, loop and ask them again
    if (!isRockPaperOrScissors(userChoice)) {
      alert("You didn't enter one of Rock, Paper, or Scissors!")
      continue;
    }

    // Iteration reached this far, meaning that the loop can end
    busyLooping = false;
  } while (busyLooping)

  // If that succeeded, then return their input
  return userChoice;
}

function playGame() {
  // Keep track of wins by each of the players:
  let numComputerWins = 0;
  let numPlayerWins = 0;
  // Play 5 rounds of the game
  for (let i = 1; i <= 5; i++) {
    // Within each loop iteration:
    //  - Get the player's input
    const playerChoice = getPlayerChoice();
    //  - Get the computers input
    const computerChoice = getComputerChoice();
    //  - Play a single round, using the player and the computers inputs
    const winResult = playRound(playerChoice, computerChoice)

    // - Print out the message for the win result:
    console.log(winResult.message);

    //  - Update the correct counter for who has won how many times
    switch (winResult.whoWon) {
      case WhoWon.PLAYER:
        numPlayerWins++;
        break;
      case WhoWon.NOBODY:
        break; // Intentionally doing nothing
      case WhoWon.COMPUTER:
        numComputerWins++;
        break;
      default:
        console.error(`Unknown winner ${winResult.whoWon}`)
    }
  }
  // At the end of the 5 rounds, we check who won
  // If the computer won then it congratulates itself
  if (numComputerWins > numPlayerWins) {
    console.log("I win!");
    // Otherwise if the player won then we congratulate the player
  } else if (numPlayerWins > numComputerWins) {
    console.log("You win!");
    // Otherwise confirm that it's a draw, and then inform the player.
  } else {
    if (numComputerWins !== numPlayerWins) {
      throw new Error(`Expected numComputerWins (${numComputerWins}) to equal numPlayerWins (${numPlayerWins}), but something weird happened!`)
    }
  }

}