document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  board.addEventListener("click", play)
  let gameBoard = new Board("X", "O")

  function play(event){

    let token = event.target.dataset.token

    // gamePlay
    if(gameBoard.p1Turn && token === ""){
      event.target.dataset.token = "X"
      gameBoard.gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      gameBoard.p1Turn = false
      drawBoardView(gameBoard.gameBoard)
    }else if (!gameBoard.p1Turn && token === ""){
      event.target.dataset.token = "O"
      gameBoard.gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      gameBoard.p1Turn = true
      drawBoardView(gameBoard.gameBoard)
    }
    gameBoard.checkWinningGame()
    //Game over
    if (gameBoard.won){
      console.log(gameBoard.checkWinningGame())
      alert(`${gameBoard.checkWinningGame().player} Won! Taco!`)
      resetBoardView()
      gameBoard.resetBoard()
    }
  }

  function drawBoardView(aBoard){
    aBoard.forEach(function(piece, index){
      console.log(piece);
      if (piece === "X"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[1].style.display ="block"
      }
      else if(piece === "O"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[0].style.display ="block"
      }
    })
  }

  function resetBoardView(){
    Array.from(document.getElementsByClassName('interior-space')).forEach(function(interiorDivElements){
      interiorDivElements.dataset.token = ""
      interiorDivElements.children[0].style.display = "none"
      interiorDivElements.children[1].style.display = "none"
    })
  }

});
