import express from 'express'
import 'babel-polyfill'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'

import renderer from './client/helpers/renderer'
import createStore from './client/helpers/createStore'
import Routes from './client/Routes'

const app = express()

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  //TODO test turning this off when OAuth is enabled
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000'
    return opts
  }
}))
app.use(express.static('public'))
app.get('*',  (req, res) => {
  
  const store = createStore(req)
  const promises =  matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })

  Promise.all(promises).then(() => {
    res.send(renderer(req, store))
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})