class Board {
  //player1 and player2 take an "X" or an "O"
  constructor(player1, player2){
    this.player1 = player1
    this.player2 = player2
    this.p1Turn = true
    this.won = false
    this.gameBoard = ["","","","","","","","",""]
  }

  //checks to see if a game has been won and by whom.
  //[1,2,3]  [4,5,6]  [7,8,9] [1,4,7] [2,5,8] [3,6,9] [1,5,9] [3,5,7]
  checkWinningGame(){
    console.log("in winning game");
    console.log("------")
    let a1 = this.gameBoard[0]
    let b2 = this.gameBoard[1]
    let c3 = this.gameBoard[2]
    let d4 = this.gameBoard[3]
    let e5 = this.gameBoard[4]
    let f6 = this.gameBoard[5]
    let g7 = this.gameBoard[6]
    let h8 = this.gameBoard[7]
    let i9 = this.gameBoard[8]
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
          this.endGame(game)
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
          this.endGame(game)
          return "Player 2"
    }
  }

  endGame(game){
      this.won = true
      console.log(JSON.stringify(game))
      //resetBoardView()
      alert(`${game.player} wins! Taco`)
      //fetch create new game in database
    }

    resetBoard(){
      this.won = false
      gameBoard.p1Turn = true
      gameBoard.gameBoard = ["","","","","","","","",""]
    }

}
