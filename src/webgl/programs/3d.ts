import {
  createProgramInfo,
  createBufferInfoFromArrays,
  resizeCanvasToDisplaySize,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
} from 'twgl.js'

import { Matrix, matrix, multiply, transpose } from 'mathjs';
import { fColor, fGeo } from 'webgl/geometry';

export interface ProgramProps {
  u_matrix: Matrix;
  width: number;
  height: number;
}

function flatten(mat: Matrix): number[] {
  var out: number[] = []
  mat.forEach((v) => out.push(v as number));
  return out
}

function ortho(w: number, h: number, d: number): Matrix {
  return matrix([
    [2/w, 0, 0, -1],
    [0, -2/h, 0, 1],
    [0, 0, 2/d, 0],
    [0, 0, 0, 1],
  ]);
}


export function createProgram(gl: WebGLRenderingContext) {
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);

    var vertexShaderSource = `
            attribute vec4 a_position;
            attribute vec4 a_color;
            uniform mat4 u_matrix;
            varying vec4 v_color;

            void main() {
                gl_Position = u_matrix * a_position;
                v_color = a_color;
            }
            `;

    var fragmentShaderSource = `
            // fragment shaders don't have a default precision so we need
            // to pick one. mediump is a good default
            precision mediump float;
            varying vec4 v_color;

            void main() {
                // gl_FragColor is a special variable a fragment shader
                // is responsible for setting
                gl_FragColor = v_color; 
            }`;


    const programInfo = createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);

    const positions = fGeo([0, 0, 0], [100, 150, 20])
    const colors = fColor({
        front: [0, 0, 0, 1],
        back: [0, 0, 1, 1],
        left: [0, 1, 0, 1],
        right: [0, 1, 1, 1],
        top: [1, 0, 0, 1],
        bottom: [1, 0, 1, 1],
        default: [1, 1, 1, 1],
      })

    const bufferInfo = createBufferInfoFromArrays(gl, {
      'a_position': positions,
      'a_color': colors 
    })
      
  return function(props: ProgramProps) {
      resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.CULL_FACE);
      gl.enable(gl.DEPTH_TEST);

      const projectionMat = ortho(gl.canvas.width, gl.canvas.height, 400)
      const finalMat = flatten(matrix(transpose(multiply(projectionMat, props.u_matrix))));

      const uniforms = {
        'u_color': [0, .8, 1, 1],
        'u_matrix': finalMat,
      };

      gl.useProgram(programInfo.program);
      setUniforms(programInfo, uniforms);
      setBuffersAndAttributes(gl, programInfo, bufferInfo);
      drawBufferInfo(gl, bufferInfo);
  }
}
