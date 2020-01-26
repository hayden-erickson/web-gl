import {Matrix, index, floor} from 'mathjs';
import {
  Vector3,
  Color,
  MeshPhongMaterial,
  DoubleSide,
  BoxGeometry,
  Raycaster,
  PlaneGeometry,
  Material,
  Mesh,
  Object3D,
  MeshBasicMaterial,
} from 'three';

const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
function meshColor(color: number) {
  const co = () => new Color(color);
  return new MeshPhongMaterial({
    // light
    specular: co(),
    // intermediate
    color: co().addScalar(-0.3),
    // dark
    emissive: co().addScalar(-0.8),
    shininess: 50,
    wireframe: false,
    side: DoubleSide,
    //map: ImageUtils.loadTexture('http://i.imgur.com/xCE2Br4.jpg?1')
  });
}

export function getRow(m: Matrix, row: number): number[] {
  return (m.subset(index(row, [0, 1, 2])).toArray() as number[][])[0];
}

export function BoxMesh(box: Matrix, color?: number) {
  const [x, y, z] = getRow(box, 0);
  const [w, h, d] = getRow(box, 1);
  const [a, b, c] = getRow(box, 2);

  var geometry = new BoxGeometry(w, h, d);

  geometry.translate(x, y, z);
  geometry.rotateX(a);
  geometry.rotateY(b);
  geometry.rotateZ(c);

  return new Mesh(geometry, meshColor(color || 0xffffff));
}

interface beamDataOpts {
  inv: boolean;
  recording: boolean;
  saveOpacity: (o: number[]) => void;
}

export function getScreenDataUrl(
  bbox: Matrix,
  opacities: number[][],
  numAngles?: number,
): string {
  let [w, h] = getRow(bbox, 1);
  // here we use * 4 b/c that's how many rotation values we want to capture
  w = numAngles ? numAngles : w * 4;

  /* // Create canvas */
  let canvas = document.createElement('canvas');
  canvas.height = h;
  canvas.width = w;

  const context = canvas.getContext('2d');
  if (context === null) return '';
  const imgData = context.createImageData(w, h);

  // the number of stored opacities should equal the width of the bounding box
  for (let col = 0; col < opacities.length; col++) {
    let N = opacities[col] ? opacities[col].length : 0;
    for (let i = 0; i < N; i++) {
      const row = Math.floor(i * (h / N) + h / (2 * N));
      const op = opacities[col][i];

      let pxl = 4 * (row * w + col);
      imgData.data[pxl] = 255;
      imgData.data[pxl + 1] = 255;
      imgData.data[pxl + 2] = 255;
      imgData.data[pxl + 3] = op;
    }
  }

  context.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}

export function getBeamDataUrl(
  obj: Object3D,
  bbox: Matrix,
  N: number,
  opts: beamDataOpts,
): string {
  const [x, y, z] = getRow(bbox, 0);
  const [w, h] = getRow(bbox, 1);

  /* // Create canvas */
  let canvas = document.createElement('canvas');
  canvas.height = h;
  canvas.width = w;

  const context = canvas.getContext('2d');
  if (context === null) return '';
  const imgData = context.createImageData(w, h);

  let ops = [];

  for (let i = 0; i < N; i++) {
    const by = Math.floor(y + i * (h / N) + h / (2 * N));

    const start = by * w * 4;
    const end = start + w * 4;

    // apparently box geometries are centered at the origin
    // hence the x +- w/2 for the ray start and end
    const srcPos = v(x - w / 2, h / 2 - by, z);
    const destPos = v(x + w / 2, h / 2 - by, z);

    const ray = new Raycaster(srcPos, destPos.sub(srcPos).normalize());
    const intersections = ray.intersectObject(obj);

    let opacity = opts.inv ? 0 : 255;
    let attStart = end;
    let dist = 0;
    let att = 0;
    switch (intersections.length) {
      case 2:
        dist = intersections[1].distance - intersections[0].distance;
        att = dist / w;
        opacity = opts.inv ? att * 255 : (1 - att) * 255;
        attStart = intersections[1].distance;
        break;
      case 3:
      case 4:
        dist = intersections[2].distance - intersections[1].distance;
        att = dist / w;
        opacity = opts.inv ? att * 255 : (1 - att) * 255;
        attStart = intersections[2].distance;
        break;
    }

    const defVal = opts.inv ? 0 : 255;

    for (let j = start; j < end; j += 4) {
      imgData.data[j] = 255;
      imgData.data[j + 1] = 255;
      imgData.data[j + 2] = 255;
      imgData.data[j + 3] = (j - start) / 4 >= attStart - 2 ? opacity : defVal;
    }

    ops.push(floor(opacity));
  }

  if (opts.recording) opts.saveOpacity(ops);

  // put data to context at (0, 0)
  context.putImageData(imgData, 0, 0);

  return canvas.toDataURL();
}

export const normalize = (imgData: ImageData) => {
  return imgData;
};

export const Beams = (bbox: Matrix, material?: Material) => {
  const [x, y, z] = getRow(bbox, 0);
  const [w, h] = getRow(bbox, 1);
  const [a, b, c] = getRow(bbox, 2);
  const geo = new PlaneGeometry(w, h);
  geo.rotateX(a);
  geo.rotateY(b);
  geo.rotateZ(c);
  geo.translate(x, y, z);

  const mat = new MeshBasicMaterial({transparent: true, opacity: 0, map: null});
  return new Mesh(geo, material || mat);
};
