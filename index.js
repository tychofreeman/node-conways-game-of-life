import {Life} from './life.js';
import fetch from 'node-fetch';
import _ from 'lodash';

const BASE_URL = 'https://game-of-life-service-ai3nmiz7aa-uc.a.run.app';

fetch(BASE_URL + '/world', {'follow': 0, 'redirect': 'manual'})
    .then(resp => {
        return resp.headers.get('location');
    })
    .then(path => {
        return fetch(BASE_URL + path, {'follow': 0});
    })
    .then(resp => { return resp.json() })
    .then(resp => {
        let game = new Life(resp.world);
        _.times(resp.generationCount, () => {
            game.step();
        });

        let body = {
            id: resp.id,
            generationCount: resp.generationCount,
            generations: game.getSteps(),
        };
        return fetch(BASE_URL + '/results', {
            method: 'POST',
            follow: 0,
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    })

    .then((resp) => {
        if (resp.status != 302) {
            console.log("Status? ", resp.status);
            console.log("StatusText? ", resp.statusText);
            return resp.text().then((text) => {
                console.log("Response Text:", text);
            });
        }
        console.log("Go look at the animation!");
        console.log(resp.headers.get('location'));
        return Promise.resolve();
    })
    .catch(e => {
        console.log("Error:", e);
    });



