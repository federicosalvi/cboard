// @flow
import firebase from 'react-native-firebase'

export default async (message) => {
  // handle your message
  const notification = new firebase.notifications.Notification()
    .setTitle('Hey There!')
    .setBody(message.data.text)
    .android.setChannelId('cboard')
    .android.setVibrate([300, 500])
    .android.setSmallIcon('ic_launcher')
    .android.setOnlyAlertOnce(true)
  firebase.notifications().displayNotification(notification)
  return Promise.resolve()
}
