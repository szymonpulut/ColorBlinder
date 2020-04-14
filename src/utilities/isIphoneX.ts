import { Dimensions, Platform } from 'react-native';

const isIphoneX = () => {
    const dim = Dimensions.get('window');

    return (
        // This has to be iOS
        Platform.OS === 'ios' &&
        // Check either, iPhone X or XR
        (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
    );
};

const isIPhoneXSize = (dim: any) => {
    return dim.height == 812 || dim.width == 812;
};

const isIPhoneXrSize = (dim: any) => {
    return dim.height == 896 || dim.width == 896;
};

export default isIphoneX;
