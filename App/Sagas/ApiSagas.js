import { eventChannel } from 'redux-saga'
import { all, call, put, take, select, race } from 'redux-saga/effects'
import ApiActions, { ApiTypes } from '../Redux/ApiRedux'
import { ConnectivityTypes, isConnected } from '../Redux/ConnectivityRedux'
import { getUsername, getToken } from '../Redux/UserRedux'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const STOP_WEBSOCKET = { type: 'STOP_WEBSOCKET' }

// on socket messages, emits the message
function watchMessages (socket) {
  return eventChannel(emit => {
    socket.onmessage = event => {
      const message = JSON.parse(event.data)
      emit(message)
    }
    socket.onclose = event => {
      emit('close')
    }
    return () => {
      socket.close()
    }
  })
}

// listens for socketChannel emissions and puts RECEIVE actions
function * backgroundTask (socketChannel) {
  while (true) {
    const payload = yield take(socketChannel)
    if (payload === 'close') {
      yield put(STOP_WEBSOCKET)
    } else {
      yield put(ApiActions.receive(payload))
    }
  }
}

// listens for SEND actions, and forwards them
function * executeTask (socketChannel) {
  while (true) {
    const data = yield take(ApiTypes.SEND)
    socketChannel.send(JSON.stringify(data.message))
  }
}

export function * connect (api) {
  let username = yield select(getUsername)
  let token = yield select(getToken)
  while (true) {
    // if offline, wait for connectivity changes
    if (!select(isConnected)) {
      yield take(ConnectivityTypes.SET_IS_CONNECTED)
    } else { // attempt connections only when online
      const socket = new WebSocket(api.baseURL)

      // either connect or timeout after 2s
      const { conn } = yield race({
        conn: call(() => new Promise(resolve => { socket.onopen = resolve })),
        timeout: delay(2000)
      })

      if (conn) {
        socket.send(JSON.stringify({ command: 'open', user: username, token }))
        yield put(ApiActions.connectionOk())
      } else {
        yield put(ApiActions.connectionFailed())
        continue
      }

      const socketChannel = yield call(watchMessages, socket)
      const { cancel } = yield race({
        task: all([
          call(backgroundTask, socketChannel),
          call(executeTask, socket)
        ]),
        cancel: take('STOP_WEBSOCKET')
      })

      if (cancel) {
        yield put(ApiActions.connectionFailed())
        socketChannel.close()
      }
    }
  }
}
