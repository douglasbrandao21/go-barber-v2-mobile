import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, View} from 'react-native';

import AppProvider from './hooks';

import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{flex: 1, backgroundColor: '#312e38'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
