import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import DrawScreen from '../Containers/DrawScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Launch: { screen: LaunchScreen },
  Draw: { screen: DrawScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Launch',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
