import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

import styles from './PlayButtonStyles';

interface Props {
    onPress: any;
}

const PlayButton: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center' }}
        >
            <Image
                source={require('assets/icons/play_arrow.png')}
                style={styles.playIcon}
            />
            <Text style={styles.play}>PLAY!</Text>
        </TouchableOpacity>
    );
};

export default PlayButton;
