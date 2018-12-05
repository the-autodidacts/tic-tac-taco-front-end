document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  board.addEventListener("click", checkState)

  //intialize the state of the board when the DOM Loads player1 always starts therefor set var for p1Turn to true
  const player1 = "X"
  const player2 = "0"
  let p1Turn    = true

  function theBoard(fill){
    let board = ["","","","","","","",""]
  }

  function checkState(event){

    //get the text content of the Span
    let innerSpace = event.target.dataset.token
    console.log(event.target.dataset.token);

    // gamePlay
    if(p1Turn && innerSpace === ""){
      event.target.dataset.token = "X"
      event.target.children[1].style.display = "block"
      p1Turn = false
      checkWinningGame()
    }else if (!p1Turn && innerSpace === ""){
      event.target.dataset.token = "O"
      event.target.children[0].style.display = "block"
      p1Turn = true
      checkWinningGame()
    }else{
      return
    }
  }


  //checks to see if a game has been won and by whom.
  //[1,2,3]  [4,5,6]  [7,8,9] [1,4,7] [2,5,8] [3,6,9] [1,5,9] [3,5,7]
  function checkWinningGame(){
    console.log("in winning game");
    let a1 = document.getElementById('1').children[0].dataset.token
    let b2 = document.getElementById('2').children[0].dataset.token
    let c3 = document.getElementById('3').children[0].dataset.token
    let d4 = document.getElementById('4').children[0].dataset.token
    let e5 = document.getElementById('5').children[0].dataset.token
    let f6 = document.getElementById('6').children[0].dataset.token
    let g7 = document.getElementById('7').children[0].dataset.token
    let h8 = document.getElementById('8').children[0].dataset.token
    let i9 = document.getElementById('9').children[0].dataset.token
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
    }else if((a1 === "X" && b2 === "X" && c3 === "X")||
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
      alert(`${game.player} wins! Taco`)
      console.log(JSON.stringify(game))
      resetBoard()
      //fetch create new game in database
    }

  function resetBoard(){
    Array.from(document.getElementsByClassName('interior-space')).forEach(function(interiorDivElements){
      console.log(interiorDivElements);
      interiorDivElements.dataset.token = ""
      interiorDivElements.children[0].style.display = "none"
      interiorDivElements.children[1].style.display = "none"
    })
  }

});
