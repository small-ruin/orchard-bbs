import React from 'react';
import type { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerNavParams, RootStackParamList, ScreenName, StackNavParams } from './types';
import Head from './components/Head';
import Home from './pages/Home';
import Board from './pages/Board';
import Topic from './pages/Topic';
import GFDrawer from './pages/Drawer'
import Login from './pages/Login';

const Stack = createStackNavigator<RootStackParamList<StackNavParams | undefined>>();
const Drawer = createDrawerNavigator<RootStackParamList<DrawerNavParams | undefined>>();

const App: () => ReactElement = () => {
  const stackNavigators = () => <Stack.Navigator>
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
    <Stack.Screen
      name={ScreenName.LOGIN}
      component={Login}
      options={{ header: props => <Head {...props} /> }}
    />
  </Stack.Navigator>

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <GFDrawer {...props}></GFDrawer>}
        openByDefault
        initialRouteName={ScreenName.HOME}>
        <Drawer.Screen
          name={ScreenName.HOME}
          component={Home}
          options={{ header: props => <Head {...props} /> }}
        />
        <Drawer.Screen
          name={ScreenName.STACK}
          component={stackNavigators}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};



export default App;
