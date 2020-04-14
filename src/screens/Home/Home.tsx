import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Header from 'src/components/Header/Header';
import PlayButton from 'src/components/PlayButton/PlayButton';
import HighScore from 'src/components/HighScore/HighScore';
import LeaderBoard from 'src/components/LeaderBoard/LeaderBoard';
import Footer from 'src/components/Footer/Footer';

import { RootStackParamList } from 'src/utilities/types';
import { retrieveData } from 'src/utilities/storage';
import playSound from 'src/utilities/playSound';
import isVerticalScreen from 'src/utilities/isVertical';

import styles from './HomeStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

const Home: React.FC<Props> = ({ navigation, route }: Props) => {
    const [isSoundOn, setIsSoundOn] = React.useState<boolean>(
        route.params.isSoundOn,
    );
    const [bestResult, setBestResult] = React.useState({ points: 0, time: 0 });
    const [isResourcesLoaded, setIsResourcesLoaded] = React.useState(false);
    const [backgroundMusic, setBackgroundMusic] = React.useState(
        new Audio.Sound(),
    );

    const { isVertical } = route.params;

    const buttonFX = new Audio.Sound();

    const loadResourcesAsync = async (): Promise<void> => {
        try {
            await Promise.all([
                backgroundMusic.loadAsync(
                    require('assets/music/Komiku_Mushrooms.mp3'),
                ),
                buttonFX.loadAsync(require('assets/sfx/button.wav')),
            ]);
            setIsResourcesLoaded(true);
            playSound(backgroundMusic, isSoundOn);
        } catch (error) {}
    };
    loadResourcesAsync();

    const musicSFXLoad = React.useEffect(() => {
        if (isResourcesLoaded) {
            const focusEvent = navigation.addListener('focus', () => {
                backgroundMusic.setIsLoopingAsync(true);
                playSound(backgroundMusic, isSoundOn);
            });

            const blurEvent = navigation.addListener('blur', () => {
                backgroundMusic.stopAsync();
                buttonFX.stopAsync();
            });

            const events = (): void => {
                focusEvent();
                blurEvent();
            };

            return events;
        }
        return undefined;
    }, [isResourcesLoaded, isSoundOn, backgroundMusic, buttonFX, navigation]);

    const stopAndPlayBackgroundMusic = React.useEffect(() => {
        if (isSoundOn && isResourcesLoaded) {
            playSound(backgroundMusic, isSoundOn);
        } else if (!isSoundOn && isResourcesLoaded) {
            backgroundMusic.stopAsync();
        }
    }, [isResourcesLoaded, isSoundOn, backgroundMusic]);

    const onPressPlay = async (): Promise<void> => {
        playSound(buttonFX, isSoundOn).then(() => {
            navigation.navigate('Game', { isSoundOn: isSoundOn });
        });
    };

    const onPressLeaderBoard = (): void => {
        // console.log('LeaderBoard pressed');
        // TODO: Create and display leaderboard
    };

    const onToggleSound = (): void => {
        setIsSoundOn((isSoundOn) => !isSoundOn);
    };

    const retrieveBestResultData = React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            Promise.all([
                retrieveData('highScore').then((val) =>
                    setBestResult((bestResult) => ({
                        ...bestResult,
                        points: val || 0,
                    })),
                ),
            ]);
        });

        return focusEvent;
    }, [navigation]);

    let { width, height } = Dimensions.get('window');

    const isScreenVertical = isVerticalScreen({ width, height });

    if (!isScreenVertical) {
        width = 414;
        height = 736;
    }

    const additionalStyles = isScreenVertical
        ? styles.vertical
        : styles.horizontal;

    return (
        <SafeAreaView style={[styles.container, additionalStyles]}>
            <Header />
            <PlayButton onPress={onPressPlay} />
            <HighScore score={bestResult.points} />
            <LeaderBoard onPress={onPressLeaderBoard} />
            <View style={{ flex: 1 }} />
            <Footer onToggleSound={onToggleSound} isSoundOn={isSoundOn} />
        </SafeAreaView>
    );
};

export default Home;
