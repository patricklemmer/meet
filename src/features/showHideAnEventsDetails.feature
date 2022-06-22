Feature: Show/hide an events details

Scenario: An event element is collapsed by default
Given the user has started the app
When the user doesnt click on an event
Then the event details should be collapsed by default

Scenario: A user can expand an event to see its details
Given the user has started the app
When the user clicks on the show event details button
Then he should open up the details for a given event

Scenario: A user can collapse an event to hide its details
Given a user has opened the detailed view of an event
When the user clicks on the hide event details button
Then the event details should collapse