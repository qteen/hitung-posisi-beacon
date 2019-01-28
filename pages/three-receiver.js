import * as turf from '@turf/turf';
import Link from 'next/link';
import {withRouter} from 'next/router';

export default withRouter((props) => {
    const pusat = turf.point([-73.988214, 40.749128]);
    let r1 = turf.transformTranslate(pusat, 0.02, 90);
    r1.properties = {id:'R1'};
    let r2 = turf.transformTranslate(pusat, 0.1, 180);
    r2.properties = {id:'R2'};
    let r3 = turf.transformTranslate(pusat, 0.02, 270);
    r3.properties = {id:'R3'};

    // beacon 1
    let beacon1 = turf.point([props.router.query.lon, props.router.query.lat]);
    let jarakb1r1 = turf.distance(r1, beacon1);
    let jarakb1r2 = turf.distance(r2, beacon1);
    let jarakb1r3 = turf.distance(r3, beacon1);

    // hitung buffer
    let bufferb1r1 = turf.buffer(r1, jarakb1r1);
    let bufferb1r2 = turf.buffer(r2, jarakb1r2);
    let bufferb1r3 = turf.buffer(r3, jarakb1r3);
    let intersectr1r2 = turf.intersect(bufferb1r1, bufferb1r2);
    let intersectr1r2r3 = turf.intersect(intersectr1r2, bufferb1r3);
    let estimateb1 = undefined;
    let totaljarak = jarakb1r1+jarakb1r2+jarakb1r3;
    turf.coordEach(intersectr1r2r3, (currentCoord) => {
        let tmpr1 = turf.distance(currentCoord, r1);
        let tmpr2 = turf.distance(currentCoord, r2);
        let tmpr3 = turf.distance(currentCoord, r3);
        let tmp_totaljarak = Math.abs(tmpr1-jarakb1r1) + Math.abs(tmpr2-jarakb1r2) + Math.abs(tmpr3-jarakb1r3);

        if(tmp_totaljarak < totaljarak) {
            totaljarak = tmp_totaljarak;
            estimateb1 = currentCoord;
        }
    });
    let marginerror = turf.distance(estimateb1, beacon1);
    return (
        <div>
            <Link href='/'><a>Go home</a></Link><br/><br/>
            R1: {JSON.stringify(r1)}<br/>
            R2: {JSON.stringify(r2)}<br/>
            R3: {JSON.stringify(r3)}<br/>
            Jarak Beacon ke R1: {jarakb1r1} km<br/>
            Jarak Beacon ke R2: {jarakb1r2} km<br/>
            Jarak Beacon ke R3: {jarakb1r3} km<br/>
            titik beacon estimasi: {JSON.stringify(estimateb1)}<br/>
            titik beacon asli: {JSON.stringify(beacon1)}<br/>
            Margin Error: {marginerror} km<br/>
        </div>
    )
})