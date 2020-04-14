interface Props {
    width: number;
    height: number;
}

const isVerticalScreen = ({ width, height }: Props): boolean => {
    if (width >= 1.5 * height) return false;
    return true;
};

export default isVerticalScreen;
