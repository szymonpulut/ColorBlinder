import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from 'src/utilities/types';

import Home from './Home/Home';
import Game from './Game/Game';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            gestureEnabled: false,
        }}
        headerMode="none"
    >
        <Stack.Screen
            name="Home"
            initialParams={{ isSoundOn: true }}
            component={Home}
        />
        <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
);

export default RootStack;
