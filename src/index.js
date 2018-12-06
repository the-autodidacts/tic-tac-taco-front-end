document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  board.addEventListener("click", play)
  let gameBoard = new Board("X", "O")
  let domController = new DOMController
  let playerConnection = new APIAdapter("api/v1/players")
  let gameConnection = new APIAdapter("api/v1/games")

  function play(event){

    let token = event.target.dataset.token
    // gamePlay
    if(gameBoard.p1Turn && token === ""){
      event.target.dataset.token = "X"
      gameBoard.gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      gameBoard.p1Turn = false
      domController.drawBoardView(gameBoard.gameBoard)

    }else if (!gameBoard.p1Turn && token === ""){
      event.target.dataset.token = "O"
      gameBoard.gameBoard[event.target.dataset.id-1] = event.target.dataset.token
      gameBoard.p1Turn = true
      domController.drawBoardView(gameBoard.gameBoard)
    }
    gameBoard.checkWinningGame()
    //Game over
    if (gameBoard.won){
      console.log(gameBoard.checkWinningGame())
      alert(`${gameBoard.checkWinningGame().player} Won! Taco!`)
      domController.resetBoardView()
      gameBoard.resetBoard()
    }
  }

});
