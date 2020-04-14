import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Tile, Color } from 'src/utilities/types';

interface Props {
    gridSize: number;
    diffTile: Tile;
    onTilePress: (rowIndex: number, columnIndex: number) => void;
    rgb: Color;
}

const Grid: React.FC<Props> = ({
    gridSize,
    diffTile,
    rgb,
    onTilePress,
}: Props) => {
    const gridArrayGen = (): any => {
        return Array(gridSize)
            .fill(null)
            .map((val, columnIndex) => (
                <View
                    style={{ flex: 1, flexDirection: 'column' }}
                    key={columnIndex}
                >
                    {Array(gridSize)
                        .fill(null)
                        .map((val, rowIndex) => (
                            <TouchableOpacity
                                key={`${rowIndex}.${columnIndex}`}
                                style={{
                                    flex: 1,
                                    backgroundColor:
                                        rowIndex === diffTile.index[0] &&
                                        columnIndex === diffTile.index[1]
                                            ? diffTile.color
                                            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                                    margin: 2,
                                }}
                                onPress={() =>
                                    onTilePress(rowIndex, columnIndex)
                                }
                            />
                        ))}
                </View>
            ));
    };

    const gridArray = gridArrayGen();
    return <>{gridArray}</>;
};

export default Grid;
