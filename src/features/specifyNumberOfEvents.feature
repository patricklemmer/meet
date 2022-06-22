Feature: Specify number of events

Scenario: When a user hasn't specified a number, 32 is the default number
  Given the user is on the main page
  When the user has not specified a number of events to be displayed
  Then the default number of events displayed should be thirty two

Scenario: A user can change the number of events they want to see
  Given the user is on the main page
  When the user specifies the number of events to be displayed
  Then the number of events shown should change accordingly