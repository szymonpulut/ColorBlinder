import { Animated } from 'react-native';

const shakeAnimation = (value: any) => {
    return null;
    Animated.sequence([
        Animated.timing(value, {
            toValue: 50,
            duration: 100,
            // useNativeDriver: true,
        }),
        Animated.timing(value, {
            toValue: -50,
            duration: 100,
            // useNativeDriver: true,
        }),
        Animated.timing(value, {
            toValue: 50,
            duration: 100,
            // useNativeDriver: true,
        }),
        Animated.timing(value, {
            toValue: -50,
            duration: 100,
            // useNativeDriver: true,
        }),
        Animated.timing(value, {
            toValue: 0,
            duration: 100,
            // useNativeDriver: true,
        }),
    ]).start();
};

export { shakeAnimation };
