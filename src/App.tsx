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

 import { Header, Body, Left, Right, Button, Icon } from 'native-base';
import Section from './components/Section'
import commonStyles from './commonStyle'
import './crawler/home'

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
           <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
             <Body><Text>纯美苹果园</Text></Body>
             <Right>
              <Button transparent>
                <Icon name='menu' />
              </Button>
             </Right>
           </Header>
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Step One">
             Edit <Text style={commonStyles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };



 export default App;
