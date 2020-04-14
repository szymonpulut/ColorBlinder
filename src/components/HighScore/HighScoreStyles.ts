import { StyleSheet } from 'react-native';

import { scale } from 'src/utilities/scale';

const styles = StyleSheet.create({
    highScore: {
        fontSize: scale(28.5),
        fontFamily: 'dogbyte',
        color: '#ecf0f1',
        marginTop: scale(20),
    },
    trophyIcon: {
        height: scale(45),
        width: scale(45),
        marginRight: scale(12.5),
    },
});

export default styles;
