import { StyleSheet } from 'react-native';

import { scale } from 'src/utilities/scale';

const styles = StyleSheet.create({
    play: {
        fontSize: scale(45),
        fontFamily: 'dogbyte',
        color: '#ecf0f1',
        marginTop: scale(80),
    },
    playIcon: {
        height: scale(60),
        width: scale(60),
        marginRight: scale(15),
    },
});

export default styles;
