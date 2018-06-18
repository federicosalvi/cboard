import Secrets from 'react-native-config'

export default {
  useFixtures: false,
  ezLogin: false,
  yellowBox: __DEV__,
  reduxLogging: __DEV__,
  includeExamples: __DEV__,
  useReactotron: __DEV__,
  debugServerUrl: { host: Secrets.DEBUG_SERVER_URL }
}
