import { Dimensions } from 'react-native';
import isVerticalScreen from './isVertical';

let { width, height } = Dimensions.get('window');

if (!isVerticalScreen({ width, height })) {
    width = 414;
    height = 736;
}

// Guideline sizes are based on standard 5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
    (height / guidelineBaseHeight) * size;

export { scale, verticalScale };
