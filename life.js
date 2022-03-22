import _ from 'lodash';
export class Life {
    constructor(world) {
        this.world = world;
        this.history = [];
    }

    neighbors(r, c) {
        if (_.isUndefined(r) || _.isUndefined(c)) return 0;
        let neighborAddrs = [
            [r-1, c-1],
            [r-1, c],
            [r-1, c+1],
            [r, c-1],
            [r, c+1],
            [r+1, c-1],
            [r+1, c],
            [r+1, c+1]
        ];

        let values =  _.map(neighborAddrs, (addr) => {
            let [r, c] = addr;
            if (
                r < 0 
                || c < 0 
                || r >= this.world.length 
                || c >= this.world[r].length
            ) {
                return 0;
            }
            return this.world[r][c];
        });
        return _.sum(values);
    }

    step() {
        this.history.push(this.world);
        let nextStep = _.map(this.world, (row, r) => {
            return _.map(row, (cell, c) => {
                let aliveNeighbors = this.neighbors(r, c);
                if (cell) {
                    return Life.shouldLive(aliveNeighbors) ? 1 : 0;
                } else {
                    return Life.shouldRegen(aliveNeighbors) ? 1 : 0;
                }
            });
        });

        this.world = nextStep;
        
        return this.world;
    }

    stepAt(i) {
        return this.history[i];
    }

    getSteps() {
        return this.history;
    }

    static shouldLive(neighbors) {
        return neighbors === 2 || neighbors === 3
    }

    static shouldRegen(neighbors) {
        return neighbors === 3;
    }
};
