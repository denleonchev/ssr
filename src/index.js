import express from 'express'
import 'babel-polyfill'

import renderer from './client/helpers/renderer'
import createStore from './client/helpers/createStore'

const app = express()

app.use(express.static('public'))
app.get('*', (req, res) => {
  
  const store = createStore()

  res.send(renderer(req, store))
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})