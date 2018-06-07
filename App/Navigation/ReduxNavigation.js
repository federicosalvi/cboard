import React from 'react'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
// for react-navigation 1.0.0-beta.30
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)
const addListener = createReduxBoundAddListener('root')
// end for react-navigation 1.0.0-beta.30

// here is our redux-aware smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props

  return <AppNavigation navigation={{
    dispatch,
    state: nav,
    addListener
  }} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
