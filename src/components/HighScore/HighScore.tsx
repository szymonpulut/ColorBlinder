import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './HighScoreStyles';

interface Props {
    score: number;
}

const HighScore: React.FC<Props> = ({ score }: Props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={require('assets/icons/trophy.png')}
                style={styles.trophyIcon}
            />
            <Text style={styles.highScore}>Hi-score: {score}</Text>
        </View>
    );
};

export default HighScore;
