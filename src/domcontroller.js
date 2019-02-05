class DOMController {

  drawBoardView(aBoard){
    aBoard.forEach(function(piece, index){

      if (piece === "X"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[1].style.display ="block"
      }
      else if(piece === "O"){
        document.querySelectorAll(`[data-id='${index+1}']`)[0].children[0].style.display ="block"
      }
    })
  }

  resetBoardView(p1, p2){
    Array.from(document.getElementsByClassName('interior-space')).forEach(function(interiorDivElements){
      interiorDivElements.dataset.token = ""
      interiorDivElements.children[0].style.display = "none"
      interiorDivElements.children[1].style.display = "none"
    })
  }

  showPlayersSideBar(p, number){
    this.resetPlayerView(number)
    document.getElementById(`player${number}-name`).children[0].innerText = p.name
  }

  showPlayersGames(game, playerNumber, index ){

    document.getElementById(`table-player${playerNumber}`).children[0].innerHTML += `
    <li data-id="${game.id}" class="previously-played-game">Game ID: ${game.id} Winner: ${game.game_winner}</li>

    `
  }

  alert(message){

    document.getElementById("message").innerHTML = `<h1> ${message}</h1>`
    message = document.getElementById("message")
    message.style.display = "block"

  }

  displayNewGameButton(){

  }

  resetPlayerView(playerNumber){
    document.getElementById(`table-player${playerNumber}`).children[0].innerHTML = ``
  }

}
