import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render an event title', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1);
  });

  test('render an events start time', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });

  test('render an events location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render a button for an events details', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(1);
  });

  test('an event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('render correct event title', () => {
    expect(EventWrapper.find('.title').text()).toEqual(mockData[0].summary);
  });

  test('render correct event start time', () => {
    const mockDataDateFormat = `${new Date(mockData[0].start.dateTime)}`;
    expect(EventWrapper.find('.start-time').text()).toEqual(
      `${mockDataDateFormat}`
    );
  });

  test('render correct location of event', () => {
    expect(EventWrapper.find('.location').text()).toEqual(mockData[0].location);
  });

  test('show event details on click on details-btn', () => {
    EventWrapper.setState({ collapsed: true });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('hide event details on click on details-btn', () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('render events details if event is expanded', () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find('.details').text()).toEqual(
      mockData[0].description
    );
  });

  test('render no event details if event is collapsed', () => {
    EventWrapper.setState({ collapsed: true });
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('render button text "Show details" if event is collapsed', () => {
    EventWrapper.setState({ collapsed: true });
    expect(EventWrapper.find('.details-btn').text()).toEqual('Show details');
  });

  test('render button text "Hide details" if event is not collapsed', () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find('.details-btn').text()).toEqual('Hide details');
  });
});
