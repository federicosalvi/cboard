module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['ignite-ignore-reactotron']
      }
    },
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-proposal-class-properties'
    ].map(require.resolve)
  }
}
