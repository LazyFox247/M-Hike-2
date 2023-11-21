import { View, Text } from 'react-native'
import React from 'react'
import ShowScreen from './ShowScreen'
import EditScreen from './EditScreen'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const HomeScreen = () => {

    return (
      
            <Stack.Navigator initialRouteName='Show'>
                <Stack.Screen
                    name='Show'
                    component={ShowScreen}
                />

                <Stack.Screen
                    name='Edit'
                    component={EditScreen}
                />
            </Stack.Navigator>       

    )
}

export default HomeScreen;