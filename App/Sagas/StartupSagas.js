import { put } from 'redux-saga/effects'
import ConnectivityActions from '../Redux/ConnectivityRedux'
import UserActions from '../Redux/UserRedux'
import NetInfo from 'NetInfo'
import firebase from 'react-native-firebase'
// process STARTUP actions
export function * startup (action) {
  let connected = yield NetInfo.isConnected.fetch().then(isConnected => isConnected)
  const dispatchConnected = connectionInfo => put(ConnectivityActions.setIsConnected(connectionInfo !== 'none'))

  NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected)
  yield put(ConnectivityActions.setIsConnected(connected))
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
