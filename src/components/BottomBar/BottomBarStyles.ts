import { StyleSheet, Dimensions } from 'react-native';

import { scale } from 'src/utilities/scale';
import isIphoneX from 'src/utilities/isIphoneX';

const styles = StyleSheet.create({
    bottomBar: {
        marginBottom: isIphoneX() ? 0 : '5%',
        marginTop: '10%',
        marginHorizontal: '5%',
        flexDirection: 'row',
    },
    bottomIcon: {
        width: scale(50),
        height: scale(50),
    },
    counterCount: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        fontSize: scale(50),
    },
    counterLabel: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#bbb',
        fontSize: scale(20),
    },
    bestContainer: {
        marginTop: scale(10),
        flexDirection: 'row',
        justifyContent: 'center',
    },

    bestIcon: {
        width: scale(25),
        height: scale(25),
        marginRight: scale(5),
    },
    bestLabel: {
        fontFamily: 'dogbyte',
        color: '#bbb',
        fontSize: scale(25),
        marginTop: scale(2.5),
    },
});

export default styles;
