import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screen/HomeScreen'
import AddScreen from './screen/AddScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => ( <Ionicons name='home' color={'blue'} size={24}/>),            
            tabBarActiveBackgroundColor: '#32a89b',
            tabBarInactiveBackgroundColor: '#e5f4f3',
          }}
        />
      
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: () => ( <Ionicons name='add-circle'  color={'blue'} size={24}/>),            tabBarActiveBackgroundColor: 'white',
            tabBarActiveBackgroundColor: '#32a89b',
            tabBarInactiveBackgroundColor: '#e5f4f3',
          
          }}
        />

      </Tab.Navigator>

    </NavigationContainer>

  )
}
export default App;






