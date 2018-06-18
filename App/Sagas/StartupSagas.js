import { AppState } from 'react-native'
import { put } from 'redux-saga/effects'
import AppStateActions from '../Redux/AppStateRedux'
import UserActions from '../Redux/UserRedux'
import NetInfo from 'NetInfo'
import firebase from 'react-native-firebase'
// process STARTUP actions
export function * startup (action) {
  let connected = yield NetInfo.isConnected.fetch().then(isConnected => isConnected)
  const dispatchConnected = connectionInfo => put(AppStateActions.setIsConnected(connectionInfo !== 'none'))
  const dispatchAppStateChange = appState => put(AppStateActions.setAppState(appState))

  NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected)
  AppState.addEventListener('change', dispatchAppStateChange)

  yield put(AppStateActions.setIsConnected(connected))
  const channel = new firebase.notifications.Android.Channel('cboard', 'Cboard Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('Cboard notifications channel')

  // Create the channel
  firebase.notifications().android.createChannel(channel)
  if (connected) {
    const fbmsg = firebase.messaging()
    let enabled = yield fbmsg.hasPermission()
    if (!enabled) {
      let requestPermission = yield fbmsg.requestPermission()
      if (!requestPermission) {
        console.tron.log('unable to get token')
        return
      }
    }
    let fcmToken = yield firebase.messaging().getToken()
    if (fcmToken !== undefined) {
      yield put(UserActions.setPcmToken(fcmToken))
    }
  }
}
