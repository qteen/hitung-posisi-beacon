import * as turf from "@turf/turf";

const pusat = turf.point([-73.988214, 40.749128]);
let r1 = turf.transformTranslate(pusat, 0.001, 90);
r1.properties = {id:'R1'};
let r2 = turf.transformTranslate(pusat, 0.003, 180);
r2.properties = {id:'R2'};
let r3 = turf.transformTranslate(pusat, 0.001, 270);
r3.properties = {id:'R3'};
let r4 = turf.transformTranslate(pusat, 0.002, 0);
r4.properties = {id:'R4'};

const sensor3 = [
    {
        id: r1.properties.id,
        pos: r1
    },
    {
        id: r2.properties.id,
        pos: r2
    },
    {
        id: r3.properties.id,
        pos: r3
    }
];

const sensor4 = [
    {
        id: r1.properties.id,
        pos: r1
    },
    {
        id: r2.properties.id,
        pos: r2
    },
    {
        id: r3.properties.id,
        pos: r3
    },
    {
        id: r4.properties.id,
        pos: r4
    }
];

export {
    pusat, sensor3, sensor4
};