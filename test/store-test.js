import {startGame, placeToken} from '../src/actions.js'
import store from '../src/store.js'
import test from 'tape'

const emptyBoard = [ '', '', '', '', '', '', '', '', '' ]

test('store - dafault values', (t) => {
  const state = store.create().getState()
  const defaultState = {
    whoseTurn: '',
    winIndices: [],
    winner: '',
    invalidMove: false,
    catsGame: false,
    board: emptyBoard
  }
  t.deepEqual(state, defaultState, 'store should have default state')
  t.end()
})

test('store - startGame', (t) => {
  const s = store.create()
  s.dispatch(startGame({whoseTurn: 'x'}))
  const state = s.getState()
  t.equal(state.whoseTurn, 'x', 'startGame should set `whoseTurn`')
  t.end()
})

test('store - placeToken x', (t) => {
  const s = store.create()
  s.dispatch(startGame({ whoseTurn: 'x' }))
  s.dispatch(placeToken({ token: 'x', index: 0 }))
  const state = s.getState()
  const expectedBoard = [ 'x', '', '', '', '', '', '', '', '' ]
  t.deepEqual(state.board, expectedBoard, 'placeToken should place the token')
  t.equal(state.winner, '', 'first token should not set a winner')
  t.equal(state.whoseTurn, 'o', 'placing a token should change `whoseTurn`')
  t.end()
})

test('store - placeToken o', (t) => {
  const s = store.create()
  s.dispatch(startGame({ whoseTurn: 'x' }))
  s.dispatch(placeToken({ token: 'x', index: 0 }))
  s.dispatch(placeToken({ token: 'o', index: 4 }))
  const state = s.getState()
  const expectedBoard = [ 'x', '', '', '', 'o', '', '', '', '' ]
  t.deepEqual(state.board, expectedBoard, 'placeToken should place the token')
  t.equal(state.winner, '', 'first token should not set a winner')
  t.equal(state.whoseTurn, 'x', 'placing a token should change `whoseTurn`')
  t.end()
})

test('store - invalidMove', (t) => {
  const s = store.create()
  s.dispatch(startGame({ whoseTurn: 'x' }))
  s.dispatch(placeToken({ token: 'x', index: 0 }))
  s.dispatch(placeToken({ token: 'o', index: 0 }))
  const state = s.getState()
  const expectedBoard = [ 'x', '', '', '', '', '', '', '', '' ]
  t.deepEqual(state.board, expectedBoard, 'placeToken should place the valid token')
  t.equal(state.winner, '', 'first token should not set a winner')
  t.equal(state.whoseTurn, 'o', 'invalid moves should not change `whoseTurn`')
  t.equal(state.invalidMove, true, 'should set invalid move flag')
  t.end()
})

test('store - winner', (t) => {
  const s = store.create()
  s.dispatch(startGame({ whoseTurn: 'x' }))
  s.dispatch(placeToken({ token: 'x', index: 0 }))
  s.dispatch(placeToken({ token: 'o', index: 6 }))
  s.dispatch(placeToken({ token: 'x', index: 1 }))
  s.dispatch(placeToken({ token: 'o', index: 7 }))
  s.dispatch(placeToken({ token: 'x', index: 2 }))
  const state = s.getState()
  const expectedBoard = [ 'x', 'x', 'x', '', '', '', 'o', 'o', '' ]
  t.deepEqual(state.board, expectedBoard, 'tokens in expected positions')
  t.equal(state.winner, 'x', 'winner should be set')
  t.equal(state.whoseTurn, '', 'winning shoud clear `whoseTurn`')
  t.end()
})

test('store - cat\'s game', (t) => {
  const s = playCatsGame()
  const state = s.getState()
  const expectedBoard = [ 'x', 'o', 'x',
    'o', 'o', 'x',
    'x', 'x', 'o' ]
  t.deepEqual(state.board, expectedBoard, 'tokens in expected positions')
  t.equal(state.winner, '', 'winner should not be set')
  t.equal(state.catsGame, true, 'cat\'s game flag should be set')
  t.equal(state.whoseTurn, '', 'cat\'s game shoud clear whoseTurn')
  t.end()
})

const playCatsGame = () => {
  const s = store.create()
  s.dispatch(startGame({ whoseTurn: 'x' }))
  s.dispatch(placeToken({ token: 'x', index: 0 }))
  s.dispatch(placeToken({ token: 'o', index: 1 }))
  s.dispatch(placeToken({ token: 'x', index: 2 }))
  s.dispatch(placeToken({ token: 'o', index: 3 }))
  s.dispatch(placeToken({ token: 'x', index: 5 }))
  s.dispatch(placeToken({ token: 'o', index: 4 }))
  s.dispatch(placeToken({ token: 'x', index: 6 }))
  s.dispatch(placeToken({ token: 'o', index: 8 }))
  s.dispatch(placeToken({ token: 'x', index: 7 }))
  return s
}

test('store - startGame over', (t) => {
  const s = playCatsGame()
  s.dispatch(startGame({whoseTurn: 'x'}))
  const state = s.getState()
  const expectedBoard = emptyBoard
  t.deepEqual(state.board, expectedBoard, 'board should be empty')
  t.equal(state.winner, '', 'winner should not be set')
  t.equal(state.catsGame, false, 'cat\'s game flag should not be set')
  t.equal(state.whoseTurn, 'x', 'whoseTurn should be x')
  t.equal(state.invalidMove, false, 'invalidMove flag should not be set')
  t.end()
})
