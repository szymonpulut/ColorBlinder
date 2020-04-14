import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

import styles from './LeaderBoardStyles';

interface Props {
    onPress: any;
}

const LeaderBoard: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 80,
            }}
        >
            <Image
                source={require('assets/icons/leaderboard.png')}
                style={styles.leaderBoardIcon}
            />
            <Text style={styles.leaderBoard}>Leaderboard</Text>
        </TouchableOpacity>
    );
};

export default LeaderBoard;
