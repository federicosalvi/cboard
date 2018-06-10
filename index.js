import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import BackgroundMessage from './App/Services/BackgroundMessage'

AppRegistry.registerComponent('cboard', () => App)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => BackgroundMessage)
