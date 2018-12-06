document.addEventListener('DOMContentLoaded', () => {
  //event listeners
  const board = document.getElementById('board')
  board.addEventListener("click", play) //game loop

  const formDiv = document.getElementById('formDiv')

  formDiv.addEventListener("submit", userSignInOrCreate)


  //class and var initialization
  let gameBoard         = new Board("X", "O")
  let domController     = new DOMController
  let playerConnection  = new APIAdapter("api/v1/players")
  let gameConnection    = new APIAdapter("api/v1/games")

  let player1     = {}
  let player2     = {}


  //game loop
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

      //create board in db
      console.log(gameBoard.gameBoard);
      gameConnection.createItem({board: gameBoard.gameBoard}).then(response => {
        if (response.ok)return response.json()
      }).then(response => {
        let boardId = response.id
      })


      domController.resetBoardView()
      gameBoard.resetBoard()
    }
  }// end game loop

  function userSignInOrCreate(event){
    event.preventDefault()
    console.log (event.target)
    player1Name = event.target.children[0].value
    player2Name = event.target.children[1].value

    playerConnection.getAll().then( playerData => {

      findUsers(playerData, player1Name, player2Name)
      if (!player1.name){

        playerConnection.createItem({name: player1Name}).then(response => {
          if (response.ok)return response.json()
        }).then(response => {
          player1 = {name: response.name, id: response.id}
          domController.showPlayersSideBar(player1, 1)
        })
      }

      if (!player2.name){

        playerConnection.createItem({name: player2Name}).then(response => {
          if (response.ok)return response.json()
        }).then(response => {
          player2 = {name: response.name, id: response.id}
          domController.showPlayersSideBar(player2, 2)
        })
      }
    })
  }

  function findUsers(players, player1Name, player2Name){

    players.forEach(function (person){

      if (person.name === player1Name){
        player1 = {name: person.name, id: person.id}
        domController.showPlayersSideBar(player1, 1)
      }
      if(person.name === player2Name){
        player2 = {name: person.name, id: person.id}
        domController.showPlayersSideBar(player2, 2)
      }
    })

  }

});
