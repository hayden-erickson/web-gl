import React from 'react';
import {Vec3} from 'store/projections/types';

export interface ConfigPanelProps {
  title: string;
  min: number;
  max: number;
  coordinates: Vec3;
  onChange(v: Vec3): void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = (
  props: ConfigPanelProps,
) => {
  return (
  <div>
    <h4>{props.title}</h4>
    {props.coordinates.map((c, idx) => {
      return (
      <div key={`config-${idx}`}>
          <input
            className="config-slider"
            type="range"
            min={props.min}
            max={props.max}
            step="any"
            value={c}
            onChange={({target: {value}}) => {
              let newCoords = [...props.coordinates];
              newCoords[idx] = parseFloat(value);
              props.onChange(newCoords as Vec3);
            }}
          />
      </div>
    )})}
  </div>);
};
