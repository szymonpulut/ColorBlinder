import { Audio } from 'expo-av';
import { PlaybackStatus } from 'expo-av/build/AV';

const playSound = (
    sound: Audio.Sound,
    isSoundOn: boolean,
): Promise<PlaybackStatus | void> => {
    if (isSoundOn) {
        try {
            return sound.replayAsync();
        } catch (error) {}
    }
    return new Promise((resolve) => {
        resolve();
    });
};

export default playSound;
