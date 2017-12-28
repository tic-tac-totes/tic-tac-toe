const emptyBoard = ['','','','','','','','','']

const initialState = {
  whoseTurn: '',
  winner: '',
  winIndices: [],
  invalidMove: false,
  catsGame: false,
  board: emptyBoard
}

const newGameState = (whoseTurn) => {
  return {
    whoseTurn,
    winner: '',
    invalidMove: false,
    catsGame: false,
    board: emptyBoard
  }
}

export const reducer = (state=initialState, action) => {
  if (action.type === 'startGame'){
    return newGameState(action.whoseTurn)
  }
  else if (action.type == 'placeToken'){
    return placeToken(state, action)
  }
  return state
}

const placeToken = (state, action) => {
  if (state.whoseTurn === action.token){
    const currentToken = state.board[action.index]
    if (currentToken === ''){
      const newBoard = addToken(state.board, action)
      const winIndices = checkWinner(newBoard)
      if (winIndices.length > 0){
        const winner = action.token
        return Object.assign({}, state, {
          whoseTurn: '',
          winIndices,
          winner,
          board: newBoard
        })
      } else {
        if (checkCatsGame(newBoard)){
          const newState = {
            board: newBoard,
            catsGame: true,
            whoseTurn: '',
            winner: ''
          }
          return Object.assign({}, state, newState)
        }
        const whoseTurn = nextTurn(state.whoseTurn)
        return Object.assign({}, state, {board: newBoard, whoseTurn})
      }
    }
    return Object.assign({}, state, {invalidMove: true})
  }
  return state
}

const addToken = (board, action) => {
  return board.map((slot, index)=>{
    if (index === action.index){
      return action.token
    }
    return slot
  })
}

const nextTurn = (whoseTurn) => {
  if (whoseTurn === 'x'){
    return 'o'
  }
  return 'x'
}

const checkWinner = (board) => {
  if (board[0] !== '' && board[0] === board[1] && board[1] === board[2]){
    return [0, 1, 2]
  }

  if (board[3] !== '' && board[3] === board[4] && board[4] === board[5]){
    return [3, 4, 5]
  }

  if (board[6] !== '' && board[6] === board[7] && board[7] === board[8]){
    return [6, 7, 8]
  }

  if (board[0] !== '' && board[0] === board[3] && board[3] === board[6]){
    return [0, 3, 6]
  }

  if (board[1] !== '' && board[1] === board[4] && board[4] === board[7]){
    return [1, 4, 7]
  }

  if (board[2] !== '' && board[2] === board[5] && board[5] === board[8]){
    return [2, 5, 8]
  }

  if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]){
    return [0, 4, 8]
  }

  if (board[2] !== '' && board[2] == board[4] && board[4] === board[6]){
    return [2, 4, 6]
  }

  return []
}

const checkCatsGame = (board) => {
  return board.every((slot) => {
    return slot !== ''
  })
}

export default reducer
