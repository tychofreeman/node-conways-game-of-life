import {jest} from '@jest/globals';
import {Life} from './life.js';

test('counts zero alive neighbors in null space', () => {
    expect(new Life([]).neighbors()).toBe(0);
});

test('counts 2 alive neighbors in middle of line', () => {
    expect(new Life([[1], [1], [1]]).neighbors(1, 0)).toBe(2);
});

test('counts 8 alive neighbors in island of life', () => {
    expect(new Life([
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], 
    ]).neighbors(1, 8)).toBe(8);
});

test('counts 3 alive neighbors in corner of square', () => {
    expect(new Life([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    ]).neighbors(1, 7)).toBe(3);
});

test('glider can step', () => {
    expect(new Life([
        [0, 0, 1, 0, 0, 0], 
        [1, 0, 1, 0, 0, 0], 
        [0, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
    ]).step()).toStrictEqual([
        [0, 1, 0, 0, 0, 0], 
        [0, 0, 1, 1, 0, 0], 
        [0, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
    ]);
});
test('life and death', () => {
    expect(Life.shouldLive(0)).toBe(false);
    expect(Life.shouldLive(1)).toBe(false);
    expect(Life.shouldLive(2)).toBe(true);
    expect(Life.shouldLive(3)).toBe(true);
    expect(Life.shouldLive(4)).toBe(false);
    expect(Life.shouldLive(5)).toBe(false);
    expect(Life.shouldLive(6)).toBe(false);
    expect(Life.shouldLive(7)).toBe(false);
    expect(Life.shouldLive(8)).toBe(false);
    expect(Life.shouldRegen(0)).toBe(false);
    expect(Life.shouldRegen(1)).toBe(false);
    expect(Life.shouldRegen(2)).toBe(false);
    expect(Life.shouldRegen(3)).toBe(true);
    expect(Life.shouldRegen(4)).toBe(false);
    expect(Life.shouldRegen(5)).toBe(false);
    expect(Life.shouldRegen(6)).toBe(false);
    expect(Life.shouldRegen(7)).toBe(false);
    expect(Life.shouldRegen(8)).toBe(false);
});
test('keeps state', () => {
    let life = new Life([
        [0, 0, 1, 0, 0, 0], 
        [1, 0, 1, 0, 0, 0], 
        [0, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
    ]);
    life.step();
    life.step();
    life.step();
    expect(life.stepAt(1)).toStrictEqual([
        [0, 1, 0, 0, 0, 0], 
        [0, 0, 1, 1, 0, 0], 
        [0, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
    ]);
});
