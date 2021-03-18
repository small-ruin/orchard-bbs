 import React from 'react';
 import type { ReactElement } from 'react';

 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';

import Head from './components/Head';
import Home from './pages/Home';
import Board from './pages/Board';
import Topic from './pages/Topic';

export type RootStackParamList = {
  Home: undefined,
  Board: { url: string },
  Topic: { url: string},
}

const Stack = createStackNavigator<RootStackParamList>();

 const App: () => ReactElement = () => {
   return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ header: props => <Head {...props} /> }}
          />
          <Stack.Screen
            name="Board"
            component={Board}
            options={{ header: props => <Head {...props} /> }}
          />
          <Stack.Screen
            name="Topic"
            component={Topic}
            options={{ header: props => <Head {...props} /> }}
          />
        </Stack.Navigator>
     </NavigationContainer>
   );
 };



 export default App;
