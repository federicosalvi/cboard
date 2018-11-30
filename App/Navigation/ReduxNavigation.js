import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers'

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)
const App = reduxifyNavigator(AppNavigation, 'root')

const mapStateToProps = (state) => ({
  state: state.nav
})
const AppWithNavigationState = connect(mapStateToProps)(App)

export default AppWithNavigationState
