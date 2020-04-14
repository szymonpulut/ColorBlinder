import { AsyncStorage } from 'react-native';

const storeData = async (
    key: string | number,
    value: string | number,
): Promise<any> => {
    try {
        await AsyncStorage.setItem(`@ColorBlinder:${key}`, String(value));
    } catch (error) {
        console.log(error);
    }
};

const retrieveData = async (key: string | number): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem(`@ColorBlinder:${key}`);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};

export { storeData, retrieveData };
