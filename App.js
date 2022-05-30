/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import Loginscreen from './src/componant/Loginscreen'
import NavigationScreen from './src/componant/NavigationScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleSheet from './src/componant/GoogleSheet';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="blue" />
      <Stack.Navigator initialRouteName={"loginscreen"}>
        <Stack.Screen name="loginscreen" component={Loginscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Google-Sheet" component={GoogleSheet} options={{ title: "Google-Sheet" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;



