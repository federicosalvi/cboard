import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  input: {
    color: Colors.coal,
    backgroundColor: Colors.silver,
    borderRadius: 20,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    alignItems: 'center'
  },
  button: {
    padding: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  disabledButton: {
    backgroundColor: Colors.charcoal
  },
  enabledButton: {
    backgroundColor: Colors.fire
  }
})
