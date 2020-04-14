import { StyleSheet } from 'react-native';

import { scale } from 'src/utilities/scale';

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        left: scale(15),
        right: scale(15),
        bottom: scale(12.5), // the 2.5px bottom margin from the text is subtracted from the 15px spacing
        flexDirection: 'row',
    },
    copyrightText: {
        fontSize: scale(16),
        fontFamily: 'dogbyte',
        marginBottom: scale(2.5),
    },
    soundIcon: {
        height: scale(35),
        width: scale(35),
    },
});

export default styles;
