import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number input box', () => {
    expect(NumberOfEventsWrapper.find('#events-number')).toHaveLength(1);
  });

  test('render number 32 by default', () => {
    expect(
      NumberOfEventsWrapper.find('#events-number').get(0).props.value
    ).toEqual(32);
  });
});
