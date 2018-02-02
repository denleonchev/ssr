import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

export default () => {
  const store = createStore(reducers, {users: [{id: 1, name: 'SAM'}]}, applyMiddleware(thunk))

  return store
}