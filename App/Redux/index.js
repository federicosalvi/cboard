import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

const config = ReduxPersist.storeConfig

/* ------------- Assemble The Reducers ------------- */
export const reducers = persistReducer(config, combineReducers({
  nav: require('./NavigationRedux').reducer,
  api: require('./ApiRedux').reducer,
  user: require('./UserRedux').reducer,
  connectivity: require('./ConnectivityRedux').reducer
}))

export default () => {
  let { store, persistor, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return { store, persistor }
}
