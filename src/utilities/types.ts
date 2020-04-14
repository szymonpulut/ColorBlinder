export type RootStackParamList = {
    Home: { isSoundOn: boolean };
    Game: { isSoundOn: boolean };
};

export interface Color {
    r?: number;
    g?: number;
    b?: number;
}

export type GameState = 'INGAME' | 'PAUSED' | 'LOST';

export interface Tile {
    index: [number, number];
    color: string;
}
