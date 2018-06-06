import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  border: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.wood
  },
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
})
