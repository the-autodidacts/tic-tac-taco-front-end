class DOMController {

  drawBoardView(aBoard){
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

  resetBoardView(p1, p2){
    Array.from(document.getElementsByClassName('interior-space')).forEach(function(interiorDivElements){
      interiorDivElements.dataset.token = ""
      interiorDivElements.children[0].style.display = "none"
      interiorDivElements.children[1].style.display = "none"
    })
  }

  showPlayersSideBar(p, number){
    document.getElementById(`table-player${number}`).innerText = p1.name
  }

  showPlayersGames(p, games){

  }

}
