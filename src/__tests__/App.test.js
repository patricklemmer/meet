import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';

describe('<App /> component', () => {
  test('render list of events', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
