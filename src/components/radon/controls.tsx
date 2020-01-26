import React from 'react';

interface InvButtonProps {
  inverted: boolean;
  invert: () => void;
}

const InvButton: React.FC<InvButtonProps> = (props: InvButtonProps) => (
  <div style={{padding: '16px'}}>
    <button
      style={{
        cursor: 'pointer',
        color: props.inverted ? 'white' : 'black',
        backgroundColor: props.inverted ? 'black' : 'white',
        fontSize: '32px',
        padding: '0px 8px',
        borderRadius: '8px',
      }}
      onClick={props.invert}>
      Invert
    </button>
  </div>
);

interface RayCountSliderProps {
  rayCount: number;
  maxRayCount: number;
  numRays: number;
  reconstructing: boolean;
  setRayCount: (n: number) => void;
}

const RayCountSlider: React.FC<RayCountSliderProps> = (
  props: RayCountSliderProps,
) => (
  <div>
    <h1 style={{color: 'white'}}>
      {props.rayCount} Beam{props.rayCount > 1 ? 's' : ''}
    </h1>
    <input
      type="range"
      min={0}
      max={props.maxRayCount}
      value={props.numRays}
      onChange={e => props.setRayCount(parseInt(e.target.value))}
    />
  </div>
);

interface RecordProps {
  recording: boolean;
  toggleRecording: () => void;
}

const Record: React.FC<RecordProps> = (props: RecordProps) => (
  <div
    style={{
      color: 'white',
      cursor: props.recording ? 'not-allowed' : 'pointer',
      padding: '8px',
      fontSize: '32px',
    }}
    onClick={props.recording ? () => {} : props.toggleRecording}>
    <span style={{padding: '4px', color: props.recording ? 'gray' : 'white'}}>
      Record
    </span>
    <button
      style={{
        cursor: props.recording ? 'not-allowed' : 'pointer',
        borderRadius: '12px',
        height: '24px',
        width: '24px',
        backgroundColor: props.recording ? 'gray' : 'red',
      }}
    />
  </div>
);

interface ReconstructProps {
  reconstructing: boolean;
  recording: boolean;
  opacities: number[][];
  toggleReconstructing: () => void;
}

const Reconstruct: React.FC<ReconstructProps> = (props: ReconstructProps) => {
  const isOff = props.reconstructing || props.recording || !props.opacities[0];

  const handleClick = isOff ? () => {} : props.toggleReconstructing;
  return (
    <div
      onClick={handleClick}
      style={{
        color: isOff ? 'gray' : 'white',
        cursor: isOff ? 'not-allowed' : 'pointer',
        padding: '8px',
        fontSize: '32px',
      }}>
      <span>Reconstruct</span>
    </div>
  );
};

type RadonControlsProps = InvButtonProps &
  RayCountSliderProps &
  RecordProps &
  ReconstructProps;

const RadonControls: React.FC<RadonControlsProps> = (
  props: RadonControlsProps,
) => (
  <div id="controls">
    <RayCountSlider {...props} />
    <InvButton {...props} />
    <Record {...props} />
    <Reconstruct {...props} />
  </div>
);

export default RadonControls;
