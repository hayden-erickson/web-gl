import React from 'react';
import {ConfigPanel} from 'components/mutations/config-panel';
import {Vec3} from 'store/types';

interface AllPanelProps {
  translation: Vec3;
  rotation: Vec3;
  scale: Vec3;
  onTranslate: (v: Vec3) => void;
  onRotate: (v: Vec3) => void;
  onScale: (v: Vec3) => void;
}

export const ConfigPanels: React.FC<AllPanelProps> = (props: AllPanelProps) => (
  <div
    style={{
      position: 'absolute',
      color: 'white',
      border: '1px solid white',
      padding: '16px',
    }}>
    <ConfigPanel
      onChange={props.onTranslate}
      coordinates={props.translation}
      min={0}
      max={500}
      title="Translation"
    />
    <ConfigPanel
      onChange={props.onRotate}
      coordinates={props.rotation}
      min={0}
      max={Math.PI * 2}
      title="Rotation"
    />
    <ConfigPanel
      onChange={props.onScale}
      coordinates={props.scale}
      min={0}
      max={2}
      title="Scale"
    />
  </div>
);
