 import React from 'react';
 import type { ReactElement } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';

import Head from './components/Head';
import Home from './pages/Home';
import Section from './components/Section';
import './crawler/home';

 const App: () => ReactElement = () => {
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
        <Head />
        <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section>
             <Home></Home>
           </Section>
        </View>
       </ScrollView>
     </SafeAreaView>
   );
 };



 export default App;
