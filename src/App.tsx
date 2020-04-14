import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RootStack from './screens/Routes';

const loadResourcesAsync = async () => {
    await Promise.all([
        Font.loadAsync({
            dogbyte: require('assets/fonts/dogbyte.otf'),
        }),
    ]);
};

const handleLoadingError = (error: any): void => {
    console.warn(error);
};

const handleFinishLoading = (setIsLoadingComplete: Function): void => {
    setIsLoadingComplete(true);
};

const Stack = createStackNavigator();

const App: React.FC = () => {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

    return isLoadingComplete ? (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            {RootStack}
        </NavigationContainer>
    ) : (
        <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setIsLoadingComplete)}
        />
    );
};

registerRootComponent(App);
