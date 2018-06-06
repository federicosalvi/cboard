import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ApiActions from '../Redux/ApiRedux'
import styles from './Styles/DrawScreenStyles'

const markerStyle = {
  position: 'absolute',
  backgroundColor: 'rgb(0, 0, 0)',
  color: 'rgb(255,255,255)',
  zIndex: 5
}

class DrawScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#000000',
      thickness: 4,
      connected: true
    }
    this.tempPath = {}
    this.decorated = false
    this.markerStyles = {}
  }

  componentDidMount = () => {
    this.props.connect(this.props.username)
    if (this.canvas != null && !this.decorated) {
      let counter = 0
      let that = this
      let onResponderMoveOld = this.canvas.panResponder.panHandlers.onResponderMove
      let onResponderReleaseOld = this.canvas.panResponder.panHandlers.onResponderRelease
      let onResponderGrantOld = this.canvas.panResponder.panHandlers.onResponderGrant
      this.canvas.panResponder.panHandlers.onResponderGrant = function onResponderGrant (evt, gestureState) {
        let { locationX, locationY } = evt.nativeEvent
        that.send({command: 'draw', coords: { x: locationX, y: locationY }})
        return onResponderGrantOld(evt, gestureState)
      }

      this.canvas.panResponder.panHandlers.onResponderMove = function onResponderMove (evt, gestureState) {
        let { locationX, locationY } = evt.nativeEvent
        if (counter % 4 === 0) {
          that.send({command: 'draw', coords: { x: locationX, y: locationY }})
        }
        counter = counter + 1
        return onResponderMoveOld(evt, gestureState)
      }

      this.canvas.panResponder.panHandlers.onResponderRelease = function onResponderRelease (evt, gestureState) {
        return onResponderReleaseOld(evt, gestureState)
      }
      this.decorated = true
      this.forceUpdate()
    }
  }

  tempId = 2000

  draw = (user, {x, y}) => {
    if (this.tempPath[user] == null) {
      this.tempPath[user] = {
        drawer: user,
        size: { // the size of drawer's canvas
          width: this.width,
          height: this.height
        },
        path: {
          id: this.tempId, // path id
          color: '#999999',
          width: 5,
          data: [
            x + ',' + y
          ]
        }
      }
      this.tempId += 1
      this.canvas.addPath(this.tempPath[user])
    } else {
      this.canvas.deletePath(this.tempPath[user].path.id)
      this.tempPath[user].path.data.push(x + ',' + y)
      this.canvas.addPath(this.tempPath[user])
    }
    y = Math.max(0, Math.min(y, this.height))
    x = Math.max(0, Math.min(x, this.width))
    this.markerStyles[user] = {
      ...markerStyle,
      top: y,
      left: x
    }
  }

  stopDrawing = (user) => {
    this.markerStyles[user] = null
    this.canvas.deletePath(this.tempPath[user].path.id)
    this.tempPath[user] = null
  }

  componentWillReceiveProps (newProps) {
    if (newProps.message != null) {
      let message = newProps.message
      switch (message.command) {
        case 'open':
          let paths = message.item
          var canvas = this.canvas
          paths.forEach((item) => {
            canvas.addPath(item)
          })
          break
        case 'add':
          this.canvas.addPath(message.item)
          this.stopDrawing(message.item.drawer)
          break
        case 'draw':
          this.draw(message.user, message.coords)
          break
        case 'remove':
          this.canvas.deletePath(message.item)
          break
        case 'clear':
          this.canvas.clear()
          break
        default:
      }
    }
    if (!newProps.online) {
      this.toast.show('No connection...', DURATION.FOREVER)
    } else if (newProps.online && this.props.online === false) {
      this.toast.show('Back Online!', DURATION.LENGTH_LONG)
      this.delayed.forEach(item => this.send(item))
      this.delayed = []
    }
    this.forceUpdate()
  }

  delayed = []

  send = (message) => {
    message.user = this.props.username
    if (this.props.online) {
      this.props.send(message)
    } else {
      this.delayed.push(message)
    }
  }

  sendPath = (path) => {
    this.send({command: 'add', item: path})
  }

  undoPath = (id) => {
    let paths = this.canvas.getPaths().filter(path => path.drawer === this.props.username)
    if (paths.length > 0) {
      id = paths[paths.length - 1].path.id
      this.canvas.deletePath(id)
      this.send({command: 'remove', item: id})
    }
  }

  clear = () => {
    this.send({command: 'clear'})
    this.canvas.clear()
  }

  render () {
    let markers = []
    Object.keys(this.markerStyles).forEach((key) => {
      if (this.markerStyles[key] != null) {
        markers.push(
          <Text key={key} style={this.markerStyles[key]}>{key}</Text>
        )
      }
    })
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.border}>
              <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'gray'}]} onPress={this.props.goBack}>
                <Text style={{color: 'white'}}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.functionButton} onPress={this.clear}>
                <Text style={{color: 'white'}}>Clear</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.functionButton} onPress={() => {
                  if (this.state.thickness > 64) {
                    return
                  }
                  this.setState({ thickness: this.state.thickness * 2 })
                }}>
                  <Text style={{color: 'white'}}>Thick</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.functionButton} onPress={() => {
                  if (this.state.thickness === 1) {
                    return
                  }
                  this.setState({ thickness: this.state.thickness / 2 })
                }}>
                  <Text style={{color: 'white'}}>Thin</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flex: 1 }}
              onLayout={event => {
                this.width = event.nativeEvent.layout.width
                this.height = event.nativeEvent.layout.height
              }}
            >
              {markers}
              <SketchCanvas
                ref={ref => { this.canvas = ref }}
                style={{ flex: 1 }}
                strokeColor={this.state.color}
                strokeWidth={this.state.thickness}
                onStrokeEnd={this.sendPath}
                user={this.props.username}
              />
            </View>
            <View style={styles.border}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'red'}]} onPress={() => {
                  this.setState({ color: '#FF0000' })
                }}>
                  <Text style={{color: 'white'}}>Red</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black'}]} onPress={() => {
                  this.setState({ color: '#000000' })
                }}>
                  <Text style={{color: 'white'}}>Black</Text>
                </TouchableOpacity>
              </View>
              <Text style={{marginRight: 8, fontSize: 20}}>{ this.state.color }</Text>
              <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black', width: 90}]} onPress={this.undoPath}>
                <Text style={{color: 'white'}}>Undo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast ref={ref => { this.toast = ref }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  message: state.api.message,
  online: state.api.connected
})

const mapDispatchToProps = (dispatch) => ({
  connect: (username) => dispatch(ApiActions.connect(username)),
  send: (message) => dispatch(ApiActions.send(message)),
  goBack: () => dispatch(NavigationActions.back())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawScreen)
