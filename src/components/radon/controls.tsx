import React from 'react';

interface InvButtonProps {
  inverted: boolean;
  invert: () => void;
}

const InvButton: React.FC<InvButtonProps> = (props: InvButtonProps) => (
  <div style={{padding: '16px'}}>
    <button
      style={{
        color: props.inverted ? 'white' : 'black',
        backgroundColor: props.inverted ? 'black' : 'white',
        fontSize: '16px',
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
  <div style={{color: 'white'}}>
    <span style={{padding: '4px'}}>{props.recording ? 'Stop' : 'Record'}</span>
    <button
      style={{
        fontSize: '16px',
        borderRadius: props.recording ? '0px' : '8px',
        height: '16px',
        width: '16px',
        backgroundColor: props.recording ? 'rgba(0, 0, 0, 0)' : 'red',
      }}
      onClick={props.toggleRecording}
    />
  </div>
);

type RadonControlsProps = InvButtonProps & RayCountSliderProps & RecordProps;

export const RadonControls: React.FC<RadonControlsProps> = (
  props: RadonControlsProps,
) => (
  <div
    id="controls"
    style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
    }}>
    <RayCountSlider {...props} />
    <InvButton {...props} />
    <Record {...props} />
  </div>
);
