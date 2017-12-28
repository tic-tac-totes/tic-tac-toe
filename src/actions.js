export const startGame = ({whoseTurn}) => {
  return {
    type: 'startGame',
    whoseTurn
  }
}

export const placeToken = ({index, token}) => {
  return {
    type: 'placeToken',
    index,
    token
  }
}
