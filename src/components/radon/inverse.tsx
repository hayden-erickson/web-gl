import React, {FC} from 'react';
import {Matrix, sqrt, floor, cos, sin} from 'mathjs';

import {getRow, normalize} from 'components/radon/utils';

interface InverseProps {
  bbox: Matrix;
  opacities: number[][];
  maxTheta: number;
  reconstructing: boolean;
}

const createInverse = (props: InverseProps) => (c: HTMLCanvasElement) => {
  if (!props.reconstructing) return;
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;

  const N = props.opacities.length;
  const delta = props.maxTheta / N;
  const w = N;
  const iWidth = floor(sqrt(2 * w * w));
  c.width = iWidth;
  c.height = iWidth;

  ctx.clearRect(0, 0, iWidth, iWidth);

  const hiW = iWidth / 2;
  const rX = hiW + hiW * cos((3 * Math.PI) / 4);
  const rY = hiW - hiW * sin((3 * Math.PI) / 4);

  ctx.globalAlpha = 5 / N;

  for (let i = 0; i < N; i++) {
    ctx.translate(hiW, hiW);
    ctx.rotate(-delta);
    ctx.translate(-hiW, -hiW);

    let B = props.opacities[i] ? props.opacities[i].length : 0;

    for (let j = 0; j < B; j++) {
      const by = Math.floor(rY + j * (w / B) + w / (2 * B));
      const op = props.opacities[i][j];
      ctx.fillStyle = `rgb(${op},${op},${op})`;
      /* ctx.fillStyle = `white`; */
      ctx.fillRect(rX, by, w, 1);
    }
  }

  const imgData = ctx.getImageData(0, 0, iWidth, iWidth);
  const norm = normalize(imgData);
  ctx.putImageData(norm, 0, 0);
};

const Inverse: FC<InverseProps> = (props: InverseProps) => {
  const [w, h] = getRow(props.bbox, 1);
  const iWidth = floor(sqrt(w * w + h * h));

  return (
    <div>
      <canvas
        width={iWidth}
        height={iWidth}
        style={{
          backgroundColor: 'black',
        }}
        ref={createInverse(props)}></canvas>
    </div>
  );
};

export default Inverse;
