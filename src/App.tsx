 import React from 'react';
 import type { ReactElement } from 'react';

 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';

import Head from './components/Head';
import Home from './pages/Home';
import Board from './pages/Board';
import Topic from './pages/Topic';
import { RootStackParamList, ScreenName } from './types';

const Stack = createStackNavigator<RootStackParamList>();

 const App: () => ReactElement = () => {
   return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenName.HOME}>
          <Stack.Screen
            name={ScreenName.HOME}
            component={Home}
            options={{ header: props => <Head {...props} /> }}
          />
          <Stack.Screen
            name={ScreenName.BOARD}
            component={Board}
            options={{ header: props => <Head {...props} /> }}
          />
          <Stack.Screen
            name={ScreenName.TOPIC}
            component={Topic}
            options={{ header: props => <Head {...props} /> }}
          />
        </Stack.Navigator>
     </NavigationContainer>
   );
 };



 export default App;
