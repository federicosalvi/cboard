import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import firebase from 'react-native-firebase'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      const notification = new firebase.notifications.Notification()
        .setTitle('Hey There!')
        .setBody(message._data.text)
        .android.setChannelId('cboard')
        .android.setSmallIcon('ic_launcher')
      firebase.notifications().displayNotification(notification)
    })
  }

  componentWillUnmount () {
    this.messageListener()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
