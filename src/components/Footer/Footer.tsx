import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './FooterStyles';

interface Props {
    onToggleSound: () => void;
    isSoundOn: boolean;
}

const Footer: React.FC<Props> = ({ onToggleSound, isSoundOn }: Props) => {
    const soundImageSource = isSoundOn
        ? require('assets/icons/speaker-on.png')
        : require('assets/icons/speaker-off.png');

    return (
        <>
            <View style={styles.footer}>
                <View>
                    <Text style={[styles.copyrightText, { color: '#E64C3C' }]}>
                        Music: Komiku
                    </Text>
                    <Text style={[styles.copyrightText, { color: '#F1C431' }]}>
                        SFX: SubspaceAudio
                    </Text>
                    <Text style={[styles.copyrightText, { color: '#3998DB' }]}>
                        Development: RS & Szymon Pulut
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={onToggleSound}>
                    <Image source={soundImageSource} style={styles.soundIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Footer;
