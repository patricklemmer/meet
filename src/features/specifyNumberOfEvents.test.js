import { defineFeature, loadFeature } from 'jest-cucumber';
import App from '../App';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  //  --------- Scenario 1
  test("When a user hasn't specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });

    // No user action, therefore empty
    when(
      'the user has not specified a number of events to be displayed',
      () => {}
    );

    then('the default number of events displayed should be thirty two', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
    });
  });

  //  --------- Scenario 2
  test('A user can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });

    when('the user specifies the number of events to be displayed', () => {
      AppWrapper.find('#events-number').simulate('change', {
        target: { value: 7 },
      });
    });

    then('the number of events shown should change accordingly', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(7);
    });
  });
});
