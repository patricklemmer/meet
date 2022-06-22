import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  // -------- Scenario 1
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has started the app', () => {
      AppWrapper = mount(<App />);
    });
    // No user action, therefore empty
    when('the user doesnt click on an event', () => {});

    then('the event details should be collapsed by default', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.details')).toHaveLength(0);
    });
  });

  // -------- Scenario 2
  test('A user can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    given('the user has started the app', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on the show event details button', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('he should open up the details for a given event', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.details').text()).toEqual(
        mockData[0].description
      );
    });
  });

  // -------- Scenario 3
  test('A user can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given('a user has opened the detailed view of an event', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ collapsed: false });
    });

    when('the user clicks on the hide event details button', () => {
      EventWrapper.update();
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event details should collapse', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
  });
});
