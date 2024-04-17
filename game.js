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

    // If the user pressed Cancel, then the returned value will be `null`.
    // If they did that then give them some feedback and then crash to return control
    // back to them.
    if (userChoice === null) {
      alert("You cancelled the user input. Terminating the game.");
      throw new Error("User terminated the game!")
    }

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

function logToResultDiv(obj) {
  // Add a div for displaying results and change all of your console.logs into DOM methods.
  const results_div = document.querySelector("#results_div")
  if (results_div === null) {
    console.error("Could not find the results div.");
    return;
  }
  const para = document.createElement("p")
  para.textContent = obj.toString();
  results_div.appendChild(para);
  console.log(results_div.textContent);
}

// Add listeners for the 3 input buttons (Rock, Paper, Scissors)
// Add an event listener to the buttons that call your playRound function with the correct playerSelection every time a
//button is clicked. (you can keep the console.logs for this step)
{
  const selections = ['rock', 'paper', 'scissors'];
  for (const selection of selections) {
    const button_id = "#" + selection + '_button'; // eg: '#rock_button'
    const button = document.querySelector(button_id)
    if (button === null) {
      console.error(`Could not find element matching selector ${button_id}`);
      break;
    }
    button.addEventListener('click', () => {
      const playerSelection = selection;
      const computerSelection = getComputerChoice();
      let winResult = playRound(playerSelection, computerSelection);
      logToResultDiv(winResult.message);

      // Update the score global variables
      switch (winResult.whoWon) {
        case WhoWon.PLAYER:
          playerWins++;
          break;
        case WhoWon.COMPUTER:
          computerWins++;
          break;
        case WhoWon.NOBODY:
          draws++;
          break;
        default:
          console.error(`Unknown winner ${winResult.whoWon}`)
      }

      // Display the running score in the log.
      logToResultDiv(`Player: ${playerWins}, Computer: ${computerWins}, Draws: ${draws}`)

      // Announce a winner if the computer or the player reached 5 wins
      if (playerWins === 5) {
        logToResultDiv("You won the game! Congratulations!");
      } else if (computerWins === 5) {
        logToResultDiv("The computer won the game! Better luck next time!");
      }
    })
  }
}

// Global variables to store the running score (number of wins for the player and the computer, as well as
// number of draws)
let playerWins = 0;
let computerWins = 0;
let draws = 0;
