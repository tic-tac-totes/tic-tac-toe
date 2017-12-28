import { createStore } from 'redux'
import reducer from './reducer.js'

const create = () => {
  return createStore(reducer)
}

export default {
  create
}
