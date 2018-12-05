document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  board.addEventListener("click", checkState)
  let gameBoard = ["","","","","","","","",""]

  //intialize the state of the board when the DOM Loads player1 always starts therefor set var for p1Turn to true
  const player1 = "X"
  const player2 = "O"
  let p1Turn    = true
  let won       = false

  function drawBoard(aBoard){
    aBoard.forEach(function(piece, index){
      console.log(piece);
      if (piece === "X"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[1].style.display ="block"
      }
      else if(piece === "O"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[0].style.display ="block"
      }
    })
    if (!won){
      checkWinningGame()
  }

  }

  function checkState(event){
    //get the text content of the Span
    let token = event.target.dataset.token

    // gamePlay
    if(p1Turn && token === ""){
      event.target.dataset.token = "X"
      gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      p1Turn = false
      console.log("gameboard is", gameBoard)
      console.log("----")
      drawBoard(gameBoard)
    }else if (!p1Turn && token === ""){
      event.target.dataset.token = "O"
      gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      p1Turn = true
      console.log("p2 check state")
      console.log("----")
      drawBoard(gameBoard)
    }
  }


  //checks to see if a game has been won and by whom.
  //[1,2,3]  [4,5,6]  [7,8,9] [1,4,7] [2,5,8] [3,6,9] [1,5,9] [3,5,7]
  function checkWinningGame(){
    console.log("in winning game");
    console.log("------")
    let a1 = gameBoard[0]
    let b2 = gameBoard[1]
    let c3 = gameBoard[2]
    let d4 = gameBoard[3]
    let e5 = gameBoard[4]
    let f6 = gameBoard[5]
    let g7 = gameBoard[6]
    let h8 = gameBoard[7]
    let i9 = gameBoard[8]
    console.log("i9 is", i9)
    console.log("------")
    if ((a1 === "X" && b2 === "X" && c3 === "X")||
        (d4 === "X" && e5 === "X" && f6 === "X")||
        (g7 === "X" && h8 === "X" && i9 === "X")||
        (a1 === "X" && d4 === "X" && g7 === "X")||
        (b2 === "X" && e5 === "X" && h8 === "X")||
        (c3 === "X" && f6 === "X" && i9 === "X")||
        (a1 === "X" && e5 === "X" && i9 === "X")||
        (c3 === "X" && e5 === "X" && g7 === "X")){
          let game ={ board: [a1, b2, c3, d4, e5, f6, g7, h8, i9],
                      player: 'Player 1'}
          endGame(game)
          return "Player 1"
    }else if((a1 === "O" && b2 === "O" && c3 === "O")||
        (d4 === "O" && e5 === "O" && f6 === "O")||
        (g7 === "O" && h8 === "O" && i9 === "O")||
        (a1 === "O" && d4 === "O" && g7 === "O")||
        (b2 === "O" && e5 === "O" && h8 === "O")||
        (c3 === "O" && f6 === "O" && i9 === "O")||
        (a1 === "O" && e5 === "O" && i9 === "O")||
        (c3 === "O" && e5 === "O" && g7 === "O")){
          let game ={ board: [a1, b2, c3, d4, e5, f6, g7, h8, i9],
                      player: 'Player 2'}
          endGame(game)
          return "Player 2"
    }
  }

  function endGame(game){
      won = true
      //drawBoard(game.board)
      console.log(JSON.stringify(game))
      //resetBoard()
      // debugger
      alert(`${game.player} wins! Taco`)

      //fetch create new game in database
    }

  function resetBoard(){
    Array.from(document.getElementsByClassName('interior-space')).forEach(function(interiorDivElements){
      interiorDivElements.dataset.token = ""
      interiorDivElements.children[0].style.display = "none"
      interiorDivElements.children[1].style.display = "none"
    })
    won     = false
    p1Turn  = true
    gameBoard = ["","","","","","","","",""]
  }

});
