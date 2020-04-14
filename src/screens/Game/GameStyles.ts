import { StyleSheet } from 'react-native';

import { scale } from 'src/utilities/scale';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pausedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pausedText: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        marginTop: scale(20),
        fontSize: scale(60),
    },
    pausedIcon: {
        width: scale(80),
        height: scale(80),
    },
    exitIcon: {
        marginTop: scale(20),
        width: scale(100),
        height: scale(50),
    },
    vertical: {
        flex: 1,
    },
    horizontal: {
        height: 736,
        width: 414,
    },
});

export default styles;
