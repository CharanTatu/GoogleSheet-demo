import React from 'react'
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function NavigationScreen() {

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={""} options={{ title: 'Welcome' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}
export default NavigationScreen
