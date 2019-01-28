import Link from 'next/link';
import {estimateLocationFromSensor, getRandomArbitrary} from "../components/util";
import {transformTranslate, distance, getCoord} from "@turf/turf";
import {pusat, sensor3, sensor4} from "../config/sensorConfig";

export default () => {
    let beaconBenchmarkArr = [];
    for(let i=0;i<10;i++) {
        const beaconPos = transformTranslate(pusat, getRandomArbitrary(0.08,0.1), getRandomArbitrary(0,90));

        let distanceObj3 = {};
        sensor3.forEach(sensor => {
            distanceObj3[sensor.id] = distance(sensor.pos, beaconPos);
        });
        const estimate3 = estimateLocationFromSensor(distanceObj3, sensor3);
        const marginerror3 = distance(beaconPos, estimate3);

        let distanceObj4 = {};
        sensor4.forEach(sensor => {
            distanceObj4[sensor.id] = distance(sensor.pos, beaconPos);
        });
        const estimate4 = estimateLocationFromSensor(distanceObj4, sensor4);
        const marginerror4 = distance(beaconPos, estimate4);

        beaconBenchmarkArr.push(<ul>
            <li>Beacon: {JSON.stringify(getCoord(beaconPos))}</li>
            <li>MarginError 3 sensor: {marginerror3}</li>
            <li>MarginError 4 sensor: {marginerror4}</li>
        </ul>)
    }
    return (
        <div>
            <div><Link href="/"><a>Go Home</a></Link></div><br/>
            {beaconBenchmarkArr}
        </div>
    )
}