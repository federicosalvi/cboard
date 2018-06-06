import { put } from 'redux-saga/effects'
import ConnectivityActions from '../Redux/ConnectivityRedux'
import NetInfo from 'NetInfo'

// process STARTUP actions
export function * startup (action) {
  let connected = yield NetInfo.isConnected.fetch().then(isConnected => isConnected)
  const dispatchConnected = connectionInfo => put(ConnectivityActions.setIsConnected(connectionInfo !== 'none'))

  NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected)

  yield put(ConnectivityActions.setIsConnected(connected))
}
