import { Color } from './types';

const generateRGB = (): Color => {
    let color: Color = {};

    color.r = Math.floor(Math.random() * 255);
    color.g = Math.floor(Math.random() * 255);
    color.b = Math.floor(Math.random() * 255);

    return color;
};

const mutateRGB = ({ r = 0, g = 0, b = 0 }: Color): Color => {
    let color: Color = {};

    color.r = r + Math.floor(Math.random() * 20) + 10;
    color.g = g + Math.floor(Math.random() * 20) + 10;
    color.b = b + Math.floor(Math.random() * 20) + 10;

    return color;
};

export { generateRGB, mutateRGB };
