import {Matrix, matrix, multiply} from 'mathjs';
import {Vec3} from 'store/types';

export function multiplyAll(...mats: Matrix[]): Matrix {
  return mats.reduce((all, m) => matrix(multiply(all, m)));
}

export function transMat(t: Vec3): Matrix {
  return matrix([
    [1, 0, 0, t[0]],
    [0, 1, 0, t[1]],
    [0, 0, 1, t[2]],
    [0, 0, 0, 1],
  ]);
}

function rotateMatX(theta: number): Matrix {
  var c = Math.cos(theta);
  var s = Math.sin(theta);
  return matrix([[1, 0, 0, 0], [0, c, -s, 0], [0, s, c, 0], [0, 0, 0, 1]]);
}

function rotateMatY(theta: number): Matrix {
  var c = Math.cos(theta);
  var s = Math.sin(theta);
  return matrix([[c, 0, -s, 0], [0, 1, 0, 0], [s, 0, c, 0], [0, 0, 0, 1]]);
}

function rotateMatZ(theta: number): Matrix {
  var c = Math.cos(theta);
  var s = Math.sin(theta);
  return matrix([[c, -s, 0, 0], [s, c, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
}

export function rotateMat(r: Vec3): Matrix {
  var rx = rotateMatX(r[0]);
  var ry = rotateMatY(r[1]);
  var rz = rotateMatZ(r[2]);

  return multiplyAll(rx, ry, rz);
}

export function scaleMat(s: Vec3): Matrix {
  return matrix([
    [s[0], 0, 0, 0],
    [0, s[1], 0, 0],
    [0, 0, s[2], 0],
    [0, 0, 0, 1],
  ]);
}
