import * as turf from '@turf/turf';
import {estimateLocationFromSensor} from './util';

const Receiver = (props) => {
    const {distanceObj, sensors} = props;

    const estimateb1 = estimateLocationFromSensor(distanceObj, sensors);
    const sensorList = sensors.map(sensor => (<span key={sensor.id}>{sensor.id}: {JSON.stringify(sensor.pos)}<br/></span>));
    const distanceList = sensors.map(sensor => (<span key={sensor.id}>Jarak Beacon ke {sensor.id}: {distanceObj[sensor.id]} km<br/></span>));
    return (
        <div>
            {sensorList}
            {distanceList}
            titik beacon estimasi: {JSON.stringify(estimateb1)}
        </div>
    )
}

export default Receiver;