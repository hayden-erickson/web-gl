import React from 'react';
import {ConfigPanel} from 'components/mutations/config-panel';
import {mount, configure} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => configure({adapter: new Adapter()}));

describe('config panel', () => {
  it('calls change handler with new value', () => {
    const onSlide = jest.fn();
    let coords = [5, 4, 3] as Vec3;

    let wrapper = mount(
      <ConfigPanel
        coordinates={coords}
        title="Scale"
        min={0}
        max={5}
        onChange={onSlide}
      />,
    );

    let sliders = wrapper.find('.config-slider');

    expect(sliders.length).toEqual(3);

    let changeVal = 2;
    let changeIdx = 0;

    sliders.at(changeIdx).simulate('change', {target: {value: changeVal}});

    coords[changeIdx] = changeVal;

    expect(onSlide.mock.calls[0][0]).toEqual(coords);
  });
});
