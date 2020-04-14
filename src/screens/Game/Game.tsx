import React from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    Image,
    Text,
    Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Header from 'src/components/Header/Header';
import BottomBar from 'src/components/BottomBar/BottomBar';
import Grid from 'src/components/Grid/Grid';

import { GameState, Tile, RootStackParamList } from 'src/utilities/types';
import { generateRGB, mutateRGB } from 'src/utilities/color';
import { storeData, retrieveData } from 'src/utilities/storage';
import { shakeAnimation as shakeAnimationFn } from 'src/utilities/shakeAnimation';
import playSound from 'src/utilities/playSound';
import isVerticalScreen from 'src/utilities/isVertical';

import styles from './GameStyles';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface Props {
    navigation: GameScreenNavigationProp;
    route: GameScreenRouteProp;
}

const Game: React.FC<Props> = ({ route, navigation }: Props) => {
    const [isSoundOn, setIsSoundOn] = React.useState<boolean>(
        route.params.isSoundOn,
    );
    const [points, setPoints] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(15);
    const [rgb, setRGB] = React.useState(generateRGB());
    const [gridSize, setGridSize] = React.useState(2);
    const [diffTile, setDiffTile] = React.useState<Tile>({
        index: [0, 0],
        color: '',
    });
    const [gameState, setGameState] = React.useState<GameState>('INGAME');
    const [timeInterval, setTimeInterval] = React.useState<ReturnType<
        typeof setInterval
    > | null>(null);
    const [timeIntervalInit, setTimeIntervalInit] = React.useState(false);
    const [isResourcesLoaded, setIsResourcesLoaded] = React.useState(false);
    const [shakeAnimation, setShakeAnimation] = React.useState(
        new Animated.Value(0),
    );
    const [bestResult, setBestResult] = React.useState({ points: 0, time: 0 });
    const [backgroundMusic, setBackgroundMusic] = React.useState(
        new Audio.Sound(),
    );

    const exitButtonFX = new Audio.Sound();
    const tileTapCorrectFX = new Audio.Sound();
    const tileTapWrongFX = new Audio.Sound();
    const pauseInFX = new Audio.Sound();
    const pauseOutFX = new Audio.Sound();
    const loseFX = new Audio.Sound();

    const loadResourcesAsync = async (): Promise<void> => {
        try {
            await Promise.all([
                backgroundMusic.loadAsync(
                    require('assets/music/Komiku_BattleOfPogs.mp3'),
                ),
                exitButtonFX.loadAsync(require('assets/sfx/button.wav')),
                tileTapCorrectFX.loadAsync(require('assets/sfx/tile_tap.wav')),
                tileTapWrongFX.loadAsync(require('assets/sfx/tile_wrong.wav')),
                pauseInFX.loadAsync(require('assets/sfx/pause_in.wav')),
                pauseOutFX.loadAsync(require('assets/sfx/pause_out.wav')),
                loseFX.loadAsync(require('assets/sfx/lose.wav')),
            ]);
            setIsResourcesLoaded(true);
            playSound(backgroundMusic, isSoundOn);
        } catch (error) {}
    };
    loadResourcesAsync();

    const generateSizeIndex = (size: number): number => {
        return Math.floor(Math.random() * size);
    };

    const generateNewRound = (): void => {
        const RGB = generateRGB();
        const mRGB = mutateRGB(RGB);
        const size = Math.min(Math.max(Math.floor(Math.sqrt(points)), 2), 5);

        setGridSize(size);
        setDiffTile({
            index: [generateSizeIndex(size), generateSizeIndex(size)],
            color: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
        });
        setRGB(RGB);
    };

    const initGameData = React.useEffect(() => {
        generateNewRound();
    }, []);

    const musicSFXLoad = React.useEffect(() => {
        if (isResourcesLoaded) {
            const focusEvent = navigation.addListener('focus', () => {
                backgroundMusic.setIsLoopingAsync(true);
                playSound(backgroundMusic, isSoundOn);
            });

            const blurEvent = navigation.addListener('blur', () => {
                exitButtonFX.stopAsync();
                tileTapWrongFX.stopAsync();
                pauseInFX.stopAsync();
                pauseOutFX.stopAsync();
                loseFX.stopAsync();
                backgroundMusic.stopAsync();
            });

            const events = (): void => {
                focusEvent();
                blurEvent();
            };

            return events;
        }
        return undefined;
    }, [
        backgroundMusic,
        exitButtonFX,
        isResourcesLoaded,
        isSoundOn,
        loseFX,
        navigation,
        pauseInFX,
        pauseOutFX,
        tileTapWrongFX,
    ]);

    const setTimeIntervalFn = (): void => {
        setTimeInterval(
            setInterval((timeLeft) => {
                if (gameState === 'INGAME') {
                    if (timeLeft > bestResult.time) {
                        setBestResult((bestResult) => ({
                            ...bestResult,
                            time: timeLeft,
                        }));
                        storeData('bestTime', timeLeft);
                    }
                    setTimeLeft((timeLeft) => timeLeft - 1);
                }
            }, 1000),
        );
    };

    const initGameTimeCountDown = React.useEffect(() => {
        if (timeIntervalInit === false) {
            setTimeIntervalFn();
            setTimeIntervalInit(true);
        }
        return (): void => {
            clearInterval(timeInterval as ReturnType<typeof setInterval>);
        };
    }, []);

    const saveResult = (): void => {
        if (points > bestResult.points) {
            setBestResult((bestResult) => ({
                ...bestResult,
                points: points,
            }));
            storeData('highScore', points);
        }
    };

    const gameTimeCountDown = React.useEffect(() => {
        if (timeLeft <= 0) {
            setGameState('LOST');
            playSound(loseFX, isSoundOn);
            backgroundMusic.stopAsync();

            saveResult();

            clearInterval(timeInterval as ReturnType<typeof setInterval>);
        }
    }, [backgroundMusic, isSoundOn, loseFX, saveResult, timeLeft]);

    const currentGameStateChecker = React.useEffect(() => {
        if (gameState === 'PAUSED') {
            clearInterval(timeInterval as ReturnType<typeof setInterval>);
        }
        if (timeIntervalInit === true) {
            if (gameState === 'INGAME') {
                setTimeIntervalFn();
            }
        }
    }, [gameState]);

    const retrieveBestResultData = React.useEffect(() => {
        const getBestResultData = async (): Promise<void> => {
            Promise.all([
                retrieveData('highScore').then((val) =>
                    setBestResult((bestResult) => ({
                        ...bestResult,
                        points: val || 0,
                    })),
                ),
                retrieveData('bestTime').then((val) =>
                    setBestResult((bestResult) => ({
                        ...bestResult,
                        time: val || 0,
                    })),
                ),
            ]);
        };

        getBestResultData();
    }, []);

    const onTilePress = (rowIndex: number, columnIndex: number): void => {
        if (
            rowIndex === diffTile.index[0] &&
            columnIndex === diffTile.index[1]
        ) {
            // Good tile pressed
            playSound(tileTapCorrectFX, isSoundOn);
            setPoints((points) => points + 1);
            setTimeLeft((timeLeft) => timeLeft + 2);
            generateNewRound();
        } else {
            // Wrong tile pressed
            playSound(tileTapWrongFX, isSoundOn);
            setTimeLeft((timeLeft) => timeLeft - 2);
            shakeAnimationFn(shakeAnimation);
        }
    };

    const onPressExit = (): void => {
        saveResult();
        navigation.navigate('Home', { isSoundOn: isSoundOn });
    };

    const onPlayPress = async (): Promise<void> => {
        switch (gameState) {
            case 'INGAME': {
                playSound(pauseInFX, isSoundOn);
                backgroundMusic.stopAsync();
                setGameState('PAUSED');
                break;
            }
            case 'PAUSED': {
                playSound(pauseOutFX, isSoundOn);
                playSound(backgroundMusic, isSoundOn);
                setGameState('INGAME');
                break;
            }
            case 'LOST': {
                const reset = async (): Promise<void> => {
                    await setPoints(0);
                    await setTimeLeft(15);
                    await setGridSize(2);

                    generateNewRound();

                    playSound(backgroundMusic, isSoundOn);
                    setGameState('INGAME');
                };
                reset();
                break;
            }
            default: {
                break;
            }
        }
    };

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
            <Header onPress={onPressExit} />
            <Animated.View
                style={{
                    height: width * 0.875,
                    width: width * 0.875,
                    flexDirection: 'row',
                    left: shakeAnimation,
                }}
            >
                {gameState === 'INGAME' ? (
                    <Grid
                        gridSize={gridSize}
                        diffTile={diffTile}
                        rgb={rgb}
                        onTilePress={onTilePress}
                    />
                ) : gameState === 'PAUSED' ? (
                    <View style={styles.pausedContainer}>
                        <Image
                            source={require('assets/icons/mug.png')}
                            style={styles.pausedIcon}
                        />
                        <Text style={styles.pausedText}>COVFEFE BREAK</Text>
                    </View>
                ) : (
                    <View style={styles.pausedContainer}>
                        <Image
                            source={require('assets/icons/dead.png')}
                            style={styles.pausedIcon}
                        />
                        <Text style={styles.pausedText}>U DED</Text>
                    </View>
                )}
            </Animated.View>
            <BottomBar
                points={points}
                timeLeft={timeLeft}
                gameState={gameState}
                onPlayPress={onPlayPress}
                bestResult={bestResult}
            />
        </SafeAreaView>
    );
};

export default Game;
