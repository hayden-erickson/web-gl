import {cubeGeo} from 'webgl/geometry'

describe('#cubeGeo', () => {
    it('returns 36 numbers representing cube geometry', () => {
        var points = cubeGeo([1, 2, 3], [2, 3, 4]);

        const numFaces = 6;
        const numPointsPerFace = 6;
        const numsPerPoint = 3;
        expect(points).toHaveLength(numFaces*numPointsPerFace*numsPerPoint);
    })
})