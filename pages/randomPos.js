import {transformTranslate, distance} from '@turf/turf';
import React from 'react';
import Link from 'next/link';
import {pusat, sensor3, sensor4} from '../config/sensorConfig';
import Receiver from '../components/Receiver'
import * as turf from "@turf/turf";
import {getRandomArbitrary} from '../components/util';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.beaconPos = transformTranslate(pusat, getRandomArbitrary(0.08,0.1), 0);
    }

    render() {
        let distanceObj3 = {};
        sensor3.forEach(sensor => {
            distanceObj3[sensor.id] = turf.distance(sensor.pos, this.beaconPos);
        });
        let distanceObj4 = {};
        sensor4.forEach(sensor => {
            distanceObj4[sensor.id] = turf.distance(sensor.pos, this.beaconPos);
        });

        return (
            <div>
                <div><Link href="/"><a>Go Home</a></Link></div><br/>
                <div>titik beacon asli: {JSON.stringify(this.beaconPos.geometry.coordinates)}</div><br/>
                <Receiver sensors={sensor3} distanceObj={distanceObj3}/><br/>
                <Receiver sensors={sensor4} distanceObj={distanceObj4}/><br/>
            </div>
        )
    }
}