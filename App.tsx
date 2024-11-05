import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import Home from './src/screens/home'
import RootNavigator from './src/navigator'


const App = () => {
  return (
    <Provider store={store}>
  <RootNavigator/>
      </Provider>
  )
}

export default App

const styles = StyleSheet.create({})