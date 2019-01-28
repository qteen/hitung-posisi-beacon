import {circle, intersect, distance, coordEach, center} from "@turf/turf";

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const estimateLocationFromSensor = (distanceObj, sensors) => {
    let totaljarak = Object.values(distanceObj).reduce((accumulator, currentValue) => {
        return accumulator+currentValue;
    }, 0);
    const buffers = sensors.map(sensor => circle(sensor.pos, distanceObj[sensor.id]));
    const intersectResult = buffers.reduce((accumulator, currentValue) => {
        if(accumulator==undefined) return currentValue;
        else return intersect(accumulator, currentValue);
    }, undefined);

    let estimateb1 = undefined;
    coordEach(intersectResult, (currentCoord) => {
        let tmpDistanceArr = sensors.map(sensor => ({
            id: sensor.id,
            distance: distance(currentCoord, sensor.pos)
        }));
        let tmp_totaljarak = tmpDistanceArr.reduce((accumulator, currentValue) => {
            return accumulator+Math.abs(currentValue.distance - distanceObj[currentValue.id]);
        }, 0);

        if(tmp_totaljarak < totaljarak) {
            totaljarak = tmp_totaljarak;
            estimateb1 = currentCoord;
        }
    });

    return estimateb1;
}