import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { GameState } from 'src/utilities/types';

import styles from './BottomBarStyles';

interface Props {
    points: number;
    timeLeft: number;
    gameState: GameState;
    onPlayPress: () => void;
    bestResult: {
        points: number;
        time: number;
    };
}

const BottomBar: React.FC<Props> = ({
    points,
    timeLeft,
    gameState,
    onPlayPress,
    bestResult,
}: Props) => {
    let bottomIcon;

    if (gameState === 'INGAME') bottomIcon = require('assets/icons/pause.png');
    else if (gameState === 'PAUSED')
        bottomIcon = require('assets/icons/play.png');
    else bottomIcon = require('assets/icons/replay.png');

    return (
        <View style={styles.bottomBar}>
            <View style={{ flex: 1 }}>
                <Text style={styles.counterCount}>{points}</Text>
                <Text style={styles.counterLabel}> points</Text>
                <View style={styles.bestContainer}>
                    <Image
                        source={require('assets/icons/trophy.png')}
                        style={styles.bestIcon}
                    />
                    <Text style={styles.bestLabel}>{bestResult.points}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={onPlayPress}
                >
                    <Image source={bottomIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.counterCount}>{timeLeft}</Text>
                <Text style={styles.counterLabel}> seconds left</Text>
                <View style={styles.bestContainer}>
                    <Image
                        source={require('assets/icons/clock.png')}
                        style={styles.bestIcon}
                    />
                    <Text style={styles.bestLabel}>{bestResult.time}</Text>
                </View>
            </View>
        </View>
    );
};

export default BottomBar;
