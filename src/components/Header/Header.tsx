import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { scale } from 'src/utilities/scale';

import styles from './HeaderStyles';

interface Props {
    fontSize?: number;
    onPress?: any;
}

const Header: React.FC<Props> = ({ fontSize = scale(55), onPress }: Props) => {
    const onPressPresent = onPress ? true : false;
    const onPressValid = onPress ? onPress : () => {};

    return (
        <TouchableOpacity onPress={onPressValid} disabled={!onPressPresent}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { color: '#E64C3C' }]}>c</Text>
                <Text style={[styles.header, { color: '#E57E31' }]}>o</Text>
                <Text style={[styles.header, { color: '#F1C431' }]}>l</Text>
                <Text style={[styles.header, { color: '#68CC73' }]}>o</Text>
                <Text style={[styles.header, { color: '#3998DB' }]}>r</Text>
                <Text style={[styles.header, { fontSize: fontSize }]}>
                    blinder
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Header;
