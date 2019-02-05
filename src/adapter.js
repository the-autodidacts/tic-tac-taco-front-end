
class APIAdapter {
  constructor(endpoint) {
    this.endpoint = `http://yoaante.com/tictactacoapi/${endpoint}`
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
   getAll() {
    return fetch(this.endpoint)
      .then(response=>response.json())
  }
   getSingle(id) {
    return fetch(`${this.endpoint}/${id}`)
      .then(response=>response.json())

  }

  createItem(body) {
    return fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)// { key: 'value', key: { key: 'value', key: 'value'} }
    })
  }

  getGames(id){
    return fetch(`${this.endpoint}/${id}/games`)
      .then(response=>response.json())
  }

   updateItem(body, id){
    return fetch(`${this.endpoint}/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }
 }
