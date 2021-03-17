 import React from 'react';
 import type {ReactNode} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
import Section from './components/Section'
import commonStyles from './commonStyle'

 const App: () => ReactNode = () => {
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
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Step One">
             Edit <Text style={commonStyles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>

           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };



 export default App;
