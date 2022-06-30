import React from 'react';
import { shallow } from 'enzyme';
import { DarkMode } from '../DarkMode';

describe('<DarkMode /> component', () => {
  test('render dark mode toggle', () => {
    const DarkModeWrapper = shallow(<DarkMode />);
    expect(DarkModeWrapper.find('input[type="checkbox"]')).toHaveLength(1);
    expect(DarkModeWrapper.find('#checkbox')).toHaveLength(1);
  });

  test('if toggle is checked mode is set to dark', () => {
    const DarkModeWrapper = shallow(<DarkMode />);
    DarkModeWrapper.find('#checkbox').simulate('change', {
      target: { checked: false },
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('if toggle is checked mode is set to light', () => {
    const DarkModeWrapper = shallow(<DarkMode />);
    DarkModeWrapper.find('#checkbox').simulate('change', {
      target: { checked: true },
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
