document.addEventListener('DOMContentLoaded', () => {
  //event listeners
  const board = document.getElementById('board')
  board.addEventListener("click", play) //game loop
  const player = document.getElementById('players')
  player.addEventListener("click", getGameSingleGame)

  const formDiv = document.getElementById('formDiv')

  formDiv.addEventListener("submit", userSignInOrCreate)


  //class and var initialization
  let gameBoard            = new Board("X", "O")
  let domController        = new DOMController
  let playerConnection     = new APIAdapter("api/v1/players")
  let gameConnection       = new APIAdapter("api/v1/games")
  let gamePlayerConnection = new APIAdapter("api/v1/game_players")

  let player1     = {}
  let player2     = {}

  function getGameSingleGame(event){
    domController.resetBoardView()
    if (event.target.className === "previously-played-game"){
      gamePlayerConnection.getSingle(event.target.dataset.id).then(data=> {
          gameConnection.getSingle(data.game_id).then(data => domController.drawBoardView(data.board.split("%")))
      })
    }
  }

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
      let message = `${gameBoard.checkWinningGame().player} won the last game! 🌮`
      domController.alert(message)
      board.setAttribute("style", "animation-name: flip-x; animation-duration: 3s;")

      //create board in db
      gameConnection.createItem({board: gameBoard.gameBoard}).then(response => {
        if (response.ok)return response.json()
      }).then(response => {
        console.log(response)
        //create finished game in DB
        gamePlayerConnection.createItem({player1_id: player1.id , player2_id: player2.id, game_id: response.id}).then(responseGamePlayer => {
          if (response.ok) return responseGamePlayer.json()
        }).then(responseGamePlayer =>
          {
            domController.resetPlayerView(1)
            domController.resetPlayerView(2)
            findUserGames(player1.id, 1)
            findUserGames(player2.id, 2)
          })
      })
      domController.resetBoardView()
      gameBoard.resetBoard()
      board.removeAttribute("animation-name")
      board.removeAttribute("animation-duration")

      }
  }// end game loop

  function userSignInOrCreate(event){
    domController.resetBoardView()
    gameBoard.resetBoard()
    event.preventDefault()
    player1     = {}
    player2     = {}
    document.getElementById(`player1-name`).children[0].innerText =""
    document.getElementById(`player2-name`).children[0].innerText =""
    player1Name = event.target.children[0].value
    player2Name = event.target.children[1].value

    playerConnection.getAll().then( playerData => {

      findUsers(playerData, player1Name, player2Name)
      findUserGames(player1.id, 1)
      findUserGames(player2.id, 2)
      if (!player1.name){

        playerConnection.createItem({name: player1Name}).then(response => {
          if (response.ok)return response.json()
        }).then(response => {
          player1 = {name: response.name, id: response.id}
          domController.resetPlayerView(1)
          domController.showPlayersSideBar(player1, 1)
        })
      }

      if (!player2.name){

        playerConnection.createItem({name: player2Name}).then(response => {
          if (response.ok)return response.json()
        }).then(response => {
          player2 = {name: response.name, id: response.id}
          domController.resetPlayerView(2)
          domController.showPlayersSideBar(player2, 2)
        })
      }
    })
  }
/////////////////////////////TO DO DISPLAY USER GAMES////////////////////////
  // function findUserGames(userId, playerNumber){
  //   let allGames = null
  //   playerConnection.getGames(userId).then(games =>{
  //     allGames = games.filter(function(game){
  //       if (game.player1_id === userId || game.player2_id === userId) return game
  //     })
  //     allGames.forEach(function(game){
  //       gameConnection.getSingle(game.id).then(data => {
  //         playerConnection.getSingle(opponent)
  //           .then(data => {
  //             console.log(data.name)
  //             domController.showPlayersGames(game, playerNumber, data.name)
  //           })
  //       })
  //     })
  //   })
  // }
  function findUserGames(userId, playerNumber){
    let allGames = null
    let index = 0
    gamePlayerConnection.getAll().then(games =>{
      allGames = games.filter(function(game){
        if (game.player1_id === userId || game.player2_id === userId) return game
      })
      allGames.forEach(function(game){
        gameConnection.getSingle(game.id).then(data => {
          index++
          domController.showPlayersGames(game, playerNumber, index)
        })
      })
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
