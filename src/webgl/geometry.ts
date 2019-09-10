const range = (n: number): number[] => {
  const arr = [...Array(n)];
  return arr.map((u, idx) => idx);
};

interface cubeColorParams {
  front?: [number, number, number, number];
  back?: [number, number, number, number];
  left?: [number, number, number, number];
  right?: [number, number, number, number];
  top?: [number, number, number, number];
  bottom?: [number, number, number, number];
  default: [number, number, number, number];
}

function copy(n: number, d: number[]) {
  return range(n)
    .map(() => d)
    .reduce((all, one) => all.concat(one), []);
}

export function cubeColor(p: cubeColorParams) {
  return copy(6, p.front || p.default)
    .concat(copy(6, p.back || p.default))
    .concat(copy(6, p.left || p.default))
    .concat(copy(6, p.right || p.default))
    .concat(copy(6, p.top || p.default))
    .concat(copy(6, p.bottom || p.default));
}

export function cubeGeo(
  p: [number, number, number],
  dims: [number, number, number],
) {

  const v = [
    [p[0], p[1], p[2]],
    [p[0], p[1] + dims[1], p[2]],
    [p[0] + dims[0], p[1], p[2]],
    [p[0] + dims[0], p[1] + dims[1], p[2]],
    [p[0], p[1], p[2] + dims[2]],
    [p[0], p[1] + dims[1], p[2] + dims[2]],
    [p[0] + dims[0], p[1], p[2] + dims[2]],
    [p[0] + dims[0], p[1] + dims[1], p[2] + dims[2]],
  ]
  var front = [...v[0], ...v[2], ...v[1], ...v[1], ...v[2], ...v[3]];

  var back = [...v[5], ...v[7], ...v[4], ...v[7], ...v[6], ...v[4]];
  
  var left = [...v[4], ...v[6], ...v[0], ...v[6], ...v[2], ...v[0]];
  
  var right = [...v[1], ...v[3], ...v[5], ...v[3], ...v[7], ...v[5]];
  
  var top = [...v[2], ...v[6], ...v[3], ...v[6], ...v[7], ...v[3]];
  
  var bottom = [...v[4], ...v[0], ...v[5], ...v[0], ...v[1], ...v[5]];

  return front
    .concat(back)
    .concat(left)
    .concat(right)
    .concat(top)
    .concat(bottom);
}

export function fGeo(
  p: [number, number, number],
  dims: [number, number, number]
  ) {

    const [x, y, z] = p;
    const [w, h, d] = dims;

    return cubeGeo(p, [w/4, h, d])
      .concat(cubeGeo([x + w/4, y, z], [w*(3/4), h/5, d]))
      .concat(cubeGeo([x + w/4, y + h*(2/5), z], [w/2, h/5, d]))
}

export function fColor(p: cubeColorParams) {
  return cubeColor(p)
    .concat(cubeColor(p))
    .concat(cubeColor(p))
}
