import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render input box', () => {
    expect(NumberOfEventsWrapper.find('#events-number')).toHaveLength(1);
  });

  test('render number 32 by default', () => {
    expect(
      NumberOfEventsWrapper.find('#events-number').get(0).props.value
    ).toEqual(32);
  });

  test('user can change number of events', () => {
    NumberOfEventsWrapper.find('#events-number').simulate('change', {
      target: { value: 7 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(7);
  });

  test('allow number above 1 only', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('#events-number').simulate('change', {
      target: { value: -1 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('allow input of numbers only', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('#events-number').simulate('change', {
      target: { value: 'string' },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });
});
