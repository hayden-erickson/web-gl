import React, {FC} from 'react';

interface InverseProps {
  filter: boolean;
  reconstruction: Uint8ClampedArray[];
  setFilter: (v: boolean) => void;
}

const drawReconstruction = (reconstruction: Uint8ClampedArray[]) => (
  canvas: HTMLCanvasElement,
) => {
  if (!canvas || !reconstruction.length) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  const w = reconstruction.length;
  const h = w;

  canvas.height = h;
  canvas.width = w;

  const imgData = context.createImageData(w, h);

  for (let i = 0; i < w * h * 4; i += 4) {
    let x = Math.floor(i / (4 * w));
    let y = Math.floor((i / 4) % w);
    imgData.data[i] = reconstruction[x][y];
    imgData.data[i + 1] = reconstruction[x][y];
    imgData.data[i + 2] = reconstruction[x][y];
    imgData.data[i + 3] = 255;
  }

  // put data to context at (0, 0)
  context.putImageData(imgData, 0, 0);
};

interface IControlsProps {
  filter: boolean;
  setFilter: (n: boolean) => void;
}

const IControls: FC<IControlsProps> = (props: IControlsProps) => {
  const handleChange = () => props.setFilter(!props.filter);
  return (
    <div style={{color: 'white', padding: '8px'}}>
      <label>filter</label>
      <input type="checkbox" onChange={handleChange} checked={props.filter} />
    </div>
  );
};

const Inverse: FC<InverseProps> = (props: InverseProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <h1 style={{color: 'white'}}>Inverse</h1>
    <IControls filter={props.filter} setFilter={props.setFilter} />
    <canvas
      style={{
        width: '300px',
        height: '300px',
      }}
      ref={drawReconstruction(props.reconstruction)}></canvas>
  </div>
);

export default Inverse;
