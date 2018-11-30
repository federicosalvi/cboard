import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, TextInput, Image, View } from 'react-native'
import { Images } from '../Themes'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
    if (this.props.username !== '') {
      this.props.goToDrawScreen()
    }
  }

  goToDrawScreen = () => {
    this.props.setUsername(this.state.username)
    this.props.goToDrawScreen()
  }

  render () {
    let disabled = this.state.username.length < 1
    let buttonStyle = disabled ? styles.disabledButton : styles.enabledButton
    let buttonColor = disabled ? 'gray' : 'white'
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <TextInput
              style={styles.input}
              placeholder='Insert your name to continue!'
              underlineColorAndroid='rgba(0,0,0,0)'
              maxLength={10}
              textAlign='center'
              enablesReturnKeyAutomatically
              onChangeText={(text) => this.setState({ username: text })}
              onSubmitEditing={this.goToDrawScreen}
            />
            <TouchableOpacity disabled={disabled} style={[styles.button, buttonStyle]} onPress={this.goToDrawScreen}>
              <Text style={{ color: buttonColor }}>Go!</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  username: state.user.username
})

const mapDispatchToProps = (dispatch) => ({
  goToDrawScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Draw' })),
  setUsername: (username) => dispatch(UserActions.setUsername(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
