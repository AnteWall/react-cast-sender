import React from 'react';
import { mount } from 'enzyme';
import CastButton from './CastButton';

describe('CastButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<CastButton />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('it pass along props', () => {
    const wrapper = mount(
      <CastButton style={{ cursor: 'none' }} onClick={() => {}} />
    );

    expect(wrapper.prop('onClick')).toBeDefined();
    expect(wrapper.prop('style')).toEqual({ cursor: 'none' });
  });
});
