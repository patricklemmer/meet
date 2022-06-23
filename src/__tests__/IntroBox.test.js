import React from 'react';
import { shallow } from 'enzyme';
import IntroBox from '../IntroBox';

describe('<IntroBox /> component', () => {
  let IntroWrapper;
  beforeAll(() => {
    IntroWrapper = shallow(<IntroBox />);
  });
  test('render an intro title', () => {
    expect(IntroWrapper.find('.title')).toHaveLength(1);
  });

  test('render an intro sub-title', () => {
    expect(IntroWrapper.find('.sub-title')).toHaveLength(1);
  });

  test('render an intro text', () => {
    expect(IntroWrapper.find('.intro-text')).toHaveLength(1);
  });
});
