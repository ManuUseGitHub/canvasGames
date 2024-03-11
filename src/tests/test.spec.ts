import { describe, expect, test } from '@jest/globals';

import * as data from '../resources/piecesmoves.json';
import { flipMatrixVerticaly } from '../resources/mathsHelper';
import { Piece } from '../resources/types';

const movesKeys = Object.keys(data)
    .filter(x => !/game|default/
    .test(x)
)
describe('inversion', () => {
    it.each(movesKeys)('first line and last line of %p are inverted', (x: any) => {
        const dataAt:Piece = (data as unknown as any[]) [x];
        const mapFlipped:string[][] = flipMatrixVerticaly(dataAt.move)
        expect(mapFlipped[0]).toBe(dataAt.move[2]);
    })

    it.each(movesKeys)('middle line of %p stais the same', (x: any) => {
        const dataAt:Piece = (data as unknown as any[]) [x];
        const mapFlipped:string[][] = flipMatrixVerticaly(dataAt.move)
        expect(mapFlipped[1]).toBe(dataAt.move[1]);
    })
});